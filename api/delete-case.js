const https = require('https');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ENVIRONMENT VARIABLES (set in Vercel dashboard)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GITHUB_TOKEN  — GitHub PAT with `repo` scope
// GITHUB_REPO   — e.g. "adebayofaruq2017-boop/HarryLegal"
// ADMIN_PASSWORD — the admin password
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Helper: make a GitHub API request and return parsed JSON.
 */
function githubRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const headers = {
      'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': 'LexCampus-Admin',
    };
    if (payload) {
      headers['Content-Length'] = Buffer.byteLength(payload);
    }

    const options = {
      hostname: 'api.github.com',
      path: path,
      method: method,
      headers: headers,
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = data ? JSON.parse(data) : {};
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(`GitHub API ${res.statusCode}: ${parsed.message || data}`));
          }
        } catch (e) {
          reject(new Error(`Failed to parse GitHub response: ${data}`));
        }
      });
    });

    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── Parse body ──
  const { password, filename } = req.body || {};

  // ── Validate admin password ──
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'lexadmin2025';
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Incorrect admin password.' });
  }

  // ── Validate filename ──
  if (!filename || !filename.trim()) {
    return res.status(400).json({ error: 'Filename is required for deletion.' });
  }

  const REPO = process.env.GITHUB_REPO;
  if (!REPO || !process.env.GITHUB_TOKEN) {
    return res.status(500).json({ error: 'Server not configured. Missing GITHUB_TOKEN or GITHUB_REPO.' });
  }

  try {
    const cleanFilename = filename.trim();
    const judgmentPath = `judgments/${cleanFilename}`;

    // ── Step 1: Delete judgment file from judgments/ on GitHub if it exists ──
    try {
      const existingFile = await githubRequest('GET', `/repos/${REPO}/contents/${judgmentPath}?ref=main`);
      if (existingFile && existingFile.sha) {
        await githubRequest('DELETE', `/repos/${REPO}/contents/${judgmentPath}`, {
          message: `Delete judgment: ${cleanFilename}`,
          sha: existingFile.sha,
          branch: 'main',
        });
      }
    } catch (err) {
      // If file is not found (404), continue to clean cases.js
      console.log(`Note: File ${judgmentPath} not found in repo or already deleted: ${err.message}`);
    }

    // ── Step 2: Read current data/cases.js ──
    const casesFile = await githubRequest('GET', `/repos/${REPO}/contents/data/cases.js?ref=main`);
    const currentCasesContent = Buffer.from(casesFile.content, 'base64').toString('utf-8');

    // ── Step 3: Remove the case from cases array ──
    let updatedCases;
    const jsonStart = currentCasesContent.indexOf('[');
    const jsonEnd = currentCasesContent.lastIndexOf(']');
    
    if (jsonStart !== -1 && jsonEnd !== -1) {
      const jsonStr = currentCasesContent.substring(jsonStart, jsonEnd + 1);
      const casesArray = JSON.parse(jsonStr);
      
      const filteredCases = casesArray.filter(c => 
        c.filename !== cleanFilename && 
        c.id !== cleanFilename && 
        c.path !== judgmentPath
      );

      updatedCases = `const CASES = ${JSON.stringify(filteredCases, null, 2)};\n`;
    } else {
      throw new Error('Could not parse CASES array in data/cases.js');
    }

    const encodedCases = Buffer.from(updatedCases, 'utf-8').toString('base64');

    // ── Step 4: Commit updated cases.js ──
    await githubRequest('PUT', `/repos/${REPO}/contents/data/cases.js`, {
      message: `Remove case: ${cleanFilename}`,
      content: encodedCases,
      sha: casesFile.sha,
      branch: 'main',
    });

    return res.status(200).json({
      success: true,
      message: `Judgment "${cleanFilename}" deleted successfully! All users will see the update in ~30 seconds.`,
      filename: cleanFilename,
    });
  } catch (err) {
    console.error('Error deleting case:', err);
    return res.status(500).json({
      error: `Failed to delete case: ${err.message}`,
    });
  }
};
