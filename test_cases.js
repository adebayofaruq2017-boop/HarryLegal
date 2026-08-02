const fs = require('fs');
const code = fs.readFileSync('data/cases.js', 'utf8');
eval(code);

CASES.forEach(c => {
  const text = c.rawText;
  let court = 'SU Court';
  if (c.filename.toUpperCase().includes('LSS') || 
      (text && (text.includes('Law Students Society Court') || text.includes('LSSJ/') || text.includes('LSS Court')))) {
    court = 'LSS Court';
  }
  console.log(c.filename + " -> " + court);
});
