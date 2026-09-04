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
    const options = {
      hostname: 'api.github.com',
      path: path,
      method: method,
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'LexCampus-Admin',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
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
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

/**
 * Sanitize a title into a safe filename.
 * e.g. "John Doe v. Jane Doe" → "JOHN_DOE_V_JANE_DOE"
 */
function titleToFilename(title) {
  return title
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 80);
}

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── Parse body ──
  const { password, title, court, content } = req.body || {};

  // ── Validate admin password ──
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'lexadmin2025';
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Incorrect admin password.' });
  }

  // ── Validate inputs ──
  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Case title is required.' });
  }
  if (!content || !content.trim()) {
    return res.status(400).json({ error: 'Judgment content is required.' });
  }

  const REPO = process.env.GITHUB_REPO;
  if (!REPO || !process.env.GITHUB_TOKEN) {
    return res.status(500).json({ error: 'Server not configured. Missing GITHUB_TOKEN or GITHUB_REPO.' });
  }

  try {
    const cleanTitle = title.trim();
    const cleanContent = content.trim();
    const courtType = court || 'SU Court';
    const filename = titleToFilename(cleanTitle) + '.txt';

    // ── Step 1: Check if the judgment .txt file already exists in judgments/ ──
    const judgmentPath = `judgments/${filename}`;
    const encodedContent = Buffer.from(cleanContent, 'utf-8').toString('base64');
    
    let existingJudgmentSha = null;
    try {
      const existingFile = await githubRequest('GET', `/repos/${REPO}/contents/${judgmentPath}?ref=main`);
      if (existingFile && existingFile.sha) {
        existingJudgmentSha = existingFile.sha;
      }
    } catch (e) {
      // File does not exist yet (404), which is normal for new judgments
    }

    const judgmentPayload = {
      message: `${existingJudgmentSha ? 'Update' : 'Add'} judgment: ${cleanTitle}`,
      content: encodedContent,
      branch: 'main',
    };
    if (existingJudgmentSha) {
      judgmentPayload.sha = existingJudgmentSha;
    }

    await githubRequest('PUT', `/repos/${REPO}/contents/${judgmentPath}`, judgmentPayload);

    // ── Step 2: Read current data/cases.js ──
    const casesFile = await githubRequest('GET', `/repos/${REPO}/contents/data/cases.js?ref=main`);
    const currentCasesContent = Buffer.from(casesFile.content, 'base64').toString('utf-8');

    // ── Step 3: Parse and append / replace the case entry ──
    const newCaseEntry = {
      filename: filename,
      title: cleanTitle,
      court: courtType,
      path: judgmentPath,
      rawText: cleanContent,
    };

    let updatedCases;
    try {
      // Extract array JSON from `const CASES = [...];`
      const jsonStart = currentCasesContent.indexOf('[');
      const jsonEnd = currentCasesContent.lastIndexOf(']');
      if (jsonStart !== -1 && jsonEnd !== -1) {
        const jsonStr = currentCasesContent.substring(jsonStart, jsonEnd + 1);
        const casesArray = JSON.parse(jsonStr);
        
        // Check if case with same filename already exists
        const existingIdx = casesArray.findIndex(c => c.filename === filename);
        if (existingIdx !== -1) {
          casesArray[existingIdx] = newCaseEntry;
        } else {
          casesArray.unshift(newCaseEntry);
        }
        updatedCases = `const CASES = ${JSON.stringify(casesArray, null, 2)};\n`;
      } else {
        throw new Error('Could not parse CASES array bounds');
      }
    } catch (parseErr) {
      // Fallback regex / substring insertion if full JSON parse fails
      const closingIndex = currentCasesContent.lastIndexOf('];');
      if (closingIndex !== -1) {
        const before = currentCasesContent.substring(0, closingIndex).trimEnd();
        const needsComma = before.trimEnd().endsWith('}');
        const entryJson = JSON.stringify(newCaseEntry, null, 2);
        updatedCases = before + (needsComma ? ',\n  ' : '\n  ') + entryJson + '\n];\n';
      } else {
        updatedCases = `const CASES = [${JSON.stringify(newCaseEntry, null, 2)}];\n`;
      }
    }

    const encodedCases = Buffer.from(updatedCases, 'utf-8').toString('base64');

    // ── Step 4: Commit updated cases.js ──
    await githubRequest('PUT', `/repos/${REPO}/contents/data/cases.js`, {
      message: `Update cases.js: ${cleanTitle}`,
      content: encodedCases,
      sha: casesFile.sha, // required for updating existing files
      branch: 'main',
    });

    return res.status(200).json({
      success: true,
      message: `Judgment "${cleanTitle}" added successfully! The app will update automatically in ~30 seconds.`,
      case: {
        id: filename,
        title: cleanTitle,
        court: courtType,
        path: judgmentPath,
      },
    });
  } catch (err) {
    console.error('Error adding case:', err);
    return res.status(500).json({
      error: `Failed to add case: ${err.message}`,
    });
  }
};
