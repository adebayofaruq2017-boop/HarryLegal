/* =============================================
   LEXCAMPUS — Main Application Logic (Auto PDF Search)
   ============================================= */

'use strict';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const State = {
  currentScreen: 'search',
  currentFilter: 'all',
  currentLibFilter: 'all',
  currentToolkit: 'maxims',
  currentAZLetter: null,
  cases: [], // Will be populated from PDFs securely
  notes: [],
  editingNoteId: null,
  isIndexing: false,
  game: {
    score: 0,
    total: 0,
    level: 1,
    levelProgress: 0,
    maxPerLevel: 10,
    currentQuestion: null
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STORAGE HELPERS (Only Notes now)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const Storage = {
  saveNotes()  { localStorage.setItem('lc_notes', JSON.stringify(State.notes)); },
  loadNotes()  { return JSON.parse(localStorage.getItem('lc_notes') || '[]'); },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// UTILITIES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function highlightText(text, query) {
  if (!query || !text) return escapeHtml(text);
  const escaped = escapeHtml(text);
  const escQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return escaped.replace(new RegExp(`(${escQuery})`, 'gi'), '<span class="highlight">$1</span>');
}

function showToast(msg, duration = 3000) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('visible');
  setTimeout(() => t.classList.remove('visible'), duration);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PDF/TXT EXTRACTION ALGORITHM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
async function extractFileText(c) {
  if (c.rawText) return c.rawText;
  try {
    if (c.path && c.path.endsWith('.pdf')) {
      const pdf = await pdfjsLib.getDocument(c.path).promise;
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const strings = textContent.items.map(item => item.str);
        fullText += strings.join(' ') + ' ';
      }
      return fullText.replace(/\s+/g, ' ').trim();
    }
  } catch (err) {
    console.error(`Failed to read file: ${c.path}`, err);
    return '';
  }
}

async function loadAndIndexCases() {
  if (typeof CASES === 'undefined' || CASES.length === 0) {
    State.cases = [];
    return;
  }

  State.isIndexing = true;
  showToast(`Indexing ${CASES.length} case documents...`);
  
  const loadedCases = [];
  
  for (const c of CASES) {
    const text = await extractFileText(c);
    // Try to guess court from filename
    let court = 'SU Court';
    if (c.filename.toUpperCase().includes('LSS')) court = 'LSS Court';

    loadedCases.push({
      id: c.filename,
      title: c.title,
      court: court,
      path: c.path,
      fullText: text,
      date: null,
      tags: [],
    });
  }

  State.cases = loadedCases;
  State.isIndexing = false;
  
  renderLibrary();
  populateNoteCaseSelect();
  showToast("PDF Indexing Complete ✓");
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SNIPPET GENERATOR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function getKeywordSnippet(text, query) {
  if (!text || !query) return '';
  const lq = query.toLowerCase();
  const lowerText = text.toLowerCase();
  const index = lowerText.indexOf(lq);
  
  if (index === -1) return text.substring(0, 150) + '...';
  
  // Grab a 120 character window around the match
  const start = Math.max(0, index - 50);
  const end = Math.min(text.length, index + query.length + 70);
  
  let snippet = text.substring(start, end);
  if (start > 0) snippet = '...' + snippet;
  if (end < text.length) snippet = snippet + '...';
  
  return snippet;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NAVIGATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function navigateTo(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const target = document.getElementById(`screen-${screen}`);
  if (target) target.classList.add('active');

  const navBtn = document.getElementById(`nav-${screen}`);
  if (navBtn) navBtn.classList.add('active');

  State.currentScreen = screen;

  if (screen === 'library') renderLibrary();
  if (screen === 'notes') renderNotes();
  if (screen === 'toolkit') {
    renderMaxims();
    renderDictionary();
    setTermOfDay();
  }
  if (screen === 'games') {
    initGame();
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MODALS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function openModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
  document.body.style.overflow = '';
}

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeAllModals();
  });
});

document.querySelectorAll('[data-close]').forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.dataset.close));
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CASE CARD HTML
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function buildCaseCard(c, query = '') {
  const badgeClass = c.court === 'SU Court' ? 'badge-su' : (c.court === 'LSS Court' ? 'badge-lss' : '');
  
  const titleHl = query ? highlightText(c.title, query) : escapeHtml(c.title);
  
  // Get contextual snippet derived from the extracted PDF text
  let summaryContent = '';
  if (query) {
    summaryContent = getKeywordSnippet(c.fullText, query);
  } else {
    // If no search query, show the first 120 chars as summary
    summaryContent = c.fullText ? c.fullText.substring(0, 120) + '...' : 'No text content available.';
  }
  
  const summaryHl = query ? highlightText(summaryContent, query) : escapeHtml(summaryContent);
  const safeQuery = escapeHtml(query).replace(/'/g, "\\'");

  return `
    <div class="case-card" onclick="viewCase('${c.id}', '${safeQuery}')">
      <div class="case-card-header">
        <div class="case-title">${titleHl}</div>
        <span class="case-court-badge ${badgeClass}">${escapeHtml(c.court)}</span>
      </div>
      <div class="case-summary" style="margin-top:8px;">${summaryHl}</div>
      <div class="case-footer">
        <span class="case-date">📄 Document Indexed</span>
        <div class="case-actions">
          <button class="case-action-btn">Read the full judgment</button>
        </div>
      </div>
    </div>`;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SEARCH
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const searchInput  = document.getElementById('search-input');
const clearBtn     = document.getElementById('clear-search');
const resultsWrap  = document.getElementById('search-results');
const resultsList  = document.getElementById('results-list');
const resultsCount = document.getElementById('results-count');
const resultsQuery = document.getElementById('results-query');
const featureCards = document.getElementById('feature-cards');

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim();
  clearBtn.classList.toggle('visible', q.length > 0);
  if (q.length < 2) { showSearchEmpty(); return; }
  runSearch(q);
});

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  clearBtn.classList.remove('visible');
  showSearchEmpty();
  searchInput.focus();
});

function showSearchEmpty() {
  resultsWrap.style.display = 'none';
  featureCards.style.display = 'flex';
}

function runSearch(q) {
  const lq = q.toLowerCase();
  const filter = State.currentFilter;
  
  if (State.isIndexing) {
     resultsWrap.style.display = 'block';
     featureCards.style.display = 'none';
     resultsCount.textContent = 'Indexing in progress...';
     resultsList.innerHTML = '<p style="color:var(--clr-text-muted); font-size: 13px;">Please wait while cases are being scanned.</p>';
     return;
  }

  const hits = State.cases.filter(c => {
    const matchCourt = filter === 'all' || c.court === filter;
    const matchQuery =
      c.title.toLowerCase().includes(lq) ||
      (c.fullText && c.fullText.toLowerCase().includes(lq));
    return matchCourt && matchQuery;
  });

  featureCards.style.display = 'none';
  resultsWrap.style.display = 'block';
  resultsCount.textContent = `${hits.length} result${hits.length !== 1 ? 's' : ''}`;
  resultsQuery.textContent = `for "${q}"`;

  if (hits.length === 0) {
    resultsList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔎</div>
        <p>No matches found in PDFs.</p>
        <p class="empty-sub">Make sure your PDFs are in the /judgments folder and you have run the update script.</p>
      </div>`;
  } else {
    resultsList.innerHTML = hits.map(c => buildCaseCard(c, q)).join('');
  }
}

document.querySelectorAll('.chip[data-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.chip[data-filter]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    State.currentFilter = btn.dataset.filter;
    if (searchInput.value.trim().length >= 2) runSearch(searchInput.value.trim());
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// LIBRARY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function renderLibrary() {
  const list  = document.getElementById('library-list');
  const empty = document.getElementById('library-empty');
  const f     = State.currentLibFilter;

  const filtered = State.cases.filter(c => f === 'all' || c.court === f);

  if (filtered.length === 0) {
    list.innerHTML = '';
    list.appendChild(empty);
    empty.style.display = 'block';
    
    if (State.isIndexing) {
        empty.innerHTML = `<p>Indexing PDFs...</p>`;
    } else {
        empty.innerHTML = `
          <div class="empty-icon">📂</div>
          <p>No cases indexed.</p>
          <p class="empty-sub">Add PDFs to the <strong>judgments/</strong> folder and run the update script.</p>
        `;
    }
  } else {
    empty.style.display = 'none';
    list.innerHTML = filtered.map(c => buildCaseCard(c)).join('');
  }
}

document.querySelectorAll('.chip[data-lib-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.chip[data-lib-filter]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    State.currentLibFilter = btn.dataset.libFilter;
    renderLibrary();
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// VIEW CASE (Detail)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function viewCase(id, queryHit = '') {
  const c = State.cases.find(x => x.id === id);
  if (!c) return;

  const badgeClass = c.court === 'SU Court' ? 'badge-su' : (c.court === 'LSS Court' ? 'badge-lss' : '');
  
  document.getElementById('case-modal-title').textContent = c.court;
  document.getElementById('case-detail-body').innerHTML = `
    <div class="case-detail-title">${escapeHtml(c.title)}</div>
    <div style="margin-bottom:16px;">
      <span class="case-court-badge ${badgeClass}">${escapeHtml(c.court)}</span>
    </div>
    
    <div class="case-detail-section">
      <div class="case-detail-label">Original Document</div>
      <div class="pdf-viewer-wrap" style="display: block; height: 500px; overflow-y:auto; padding:16px; border:1px solid rgba(255,255,255,0.1); border-radius:6px; background:var(--clr-bg); line-height:1.6;">
        ${c.path.endsWith('.txt') 
            ? `<pre style="white-space:pre-wrap; font-family:var(--font-primary); font-size:14px; margin:0;">${queryHit ? highlightText(c.fullText, queryHit) : escapeHtml(c.fullText)}</pre>`
            : `<iframe src="${c.path}" title="Judgment PDF" style="width:100%; height:100%;"></iframe>`
        }
      </div>
    </div>
  `;

  openModal('modal-case');
}
window.viewCase = viewCase;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TOOLKIT — Legal Maxims
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function renderMaxims(query = '') {
  const list = document.getElementById('maxims-list');
  const lq   = query.toLowerCase();
  const items = LEGAL_MAXIMS.filter(m =>
    !lq ||
    m.latin.toLowerCase().includes(lq) ||
    m.english.toLowerCase().includes(lq) ||
    m.meaning.toLowerCase().includes(lq) ||
    m.area.toLowerCase().includes(lq)
  );

  if (items.length === 0) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">🔍</div><p>No maxims found.</p></div>`;
    return;
  }

  list.innerHTML = items.map(m => `
    <div class="maxim-card" data-maxim-id="${m.id}" onclick="showMaximDetail(${m.id})">
      <div class="maxim-area">${escapeHtml(m.area)}</div>
      <div class="maxim-latin">${query ? highlightText(m.latin, query) : escapeHtml(m.latin)}</div>
      <div class="maxim-english">"${query ? highlightText(m.english, query) : escapeHtml(m.english)}"</div>
      <div class="maxim-meaning">${query ? highlightText(m.meaning, query) : escapeHtml(m.meaning)}</div>
    </div>
  `).join('');
}

function showMaximDetail(id) {
  const m = LEGAL_MAXIMS.find(x => x.id === id);
  if (!m) return;
  document.getElementById('toolkit-detail-title').textContent = 'Legal Maxim';
  document.getElementById('toolkit-detail-body').innerHTML = `
    <div class="toolkit-detail-latin">${escapeHtml(m.latin)}</div>
    <div class="toolkit-detail-english">"${escapeHtml(m.english)}"</div>
    <div class="toolkit-detail-body">${escapeHtml(m.meaning)}</div>
    <div class="toolkit-detail-area">${escapeHtml(m.area)}</div>
  `;
  openModal('modal-toolkit-detail');
}
window.showMaximDetail = showMaximDetail;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TOOLKIT — Dictionary
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function buildAZNav(activeLetters) {
  const nav = document.getElementById('az-nav');
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  nav.innerHTML = letters.map(l => {
    const has = activeLetters.includes(l);
    const activeClass = State.currentAZLetter === l ? ' active' : '';
    return `<button class="az-btn${activeClass}" ${!has ? 'style="opacity:0.3;pointer-events:none"' : ''} 
      onclick="filterByLetter('${l}')">${l}</button>`;
  }).join('');
}

function filterByLetter(letter) {
  State.currentAZLetter = letter === State.currentAZLetter ? null : letter;
  renderDictionary(document.getElementById('toolkit-search').value.trim());
}
window.filterByLetter = filterByLetter;

function renderDictionary(query = '') {
  const list = document.getElementById('dict-list');
  const lq   = query.toLowerCase();

  let items = LAW_DICTIONARY.filter(d =>
    !lq ||
    d.term.toLowerCase().includes(lq) ||
    d.definition.toLowerCase().includes(lq) ||
    d.area.toLowerCase().includes(lq)
  );

  if (State.currentAZLetter) {
    items = items.filter(d => d.letter === State.currentAZLetter);
  }

  const activeLetters = [...new Set(LAW_DICTIONARY.map(d => d.letter))];
  buildAZNav(activeLetters);

  if (items.length === 0) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">📖</div><p>No terms found.</p></div>`;
    return;
  }

  const grouped = {};
  items.forEach(d => {
    if (!grouped[d.letter]) grouped[d.letter] = [];
    grouped[d.letter].push(d);
  });

  list.innerHTML = Object.keys(grouped).sort().map(letter => `
    <div class="dict-letter-group">
      <div class="dict-letter-heading">${letter}</div>
      ${grouped[letter].map(d => `
        <div class="dict-entry" onclick="showDictDetail('${escapeHtml(d.term).replace(/'/g, "\\'")}')">
          <div class="dict-term">${query ? highlightText(d.term, query) : escapeHtml(d.term)}</div>
          <div class="dict-area">${escapeHtml(d.area)}</div>
          <div class="dict-def">${query ? highlightText(d.definition, query) : escapeHtml(d.definition)}</div>
        </div>
      `).join('')}
    </div>
  `).join('');
}

function showDictDetail(term) {
  const d = LAW_DICTIONARY.find(x => x.term === term);
  if (!d) return;
  document.getElementById('toolkit-detail-title').textContent = d.term;
  document.getElementById('toolkit-detail-body').innerHTML = `
    <div class="toolkit-detail-english" style="font-size:13px;margin-bottom:12px;">${escapeHtml(d.area)}</div>
    <div class="toolkit-detail-body">${escapeHtml(d.definition)}</div>
  `;
  openModal('modal-toolkit-detail');
}
window.showDictDetail = showDictDetail;

document.querySelectorAll('.tk-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tk-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.toolkit-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    State.currentToolkit = tab.dataset.tk;
    document.getElementById(`panel-${tab.dataset.tk}`).classList.add('active');
  });
});

document.getElementById('toolkit-search').addEventListener('input', function() {
  const q = this.value.trim();
  if (State.currentToolkit === 'maxims') renderMaxims(q);
  else renderDictionary(q);
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TERM OF THE DAY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function setTermOfDay() {
  const dayIndex = Math.floor(Date.now() / 86400000) % LAW_DICTIONARY.length;
  const entry = LAW_DICTIONARY[dayIndex];
  document.getElementById('totd-term').textContent = entry.term;
  document.getElementById('totd-def').textContent = entry.definition.substring(0, 120) + '…';

  document.getElementById('totd-explore').onclick = () => {
    document.querySelectorAll('.tk-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.toolkit-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('tab-dictionary').classList.add('active');
    document.getElementById('panel-dictionary').classList.add('active');
    State.currentToolkit = 'dictionary';
    showDictDetail(entry.term);
  };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NOTES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function renderNotes() {
  const list  = document.getElementById('notes-list');
  const empty = document.getElementById('notes-empty');

  if (State.notes.length === 0) {
    list.innerHTML = '';
    list.appendChild(empty);
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';
  const sorted = [...State.notes].sort((a, b) => (b.updatedAt || b.createdAt) - (a.updatedAt || a.createdAt));

  list.innerHTML = sorted.map(n => {
    const linked = n.caseId ? State.cases.find(c => c.id === n.caseId) : null;
    return `
      <div class="note-card" id="note-${n.id}">
        <div class="note-title">${escapeHtml(n.title || 'Untitled Note')}</div>
        <div class="note-meta">
          ${n.date ? `<span>📅 ${formatDate(n.date)}</span>` : ''}
          ${linked ? `<span>📎 ${escapeHtml(linked.title)}</span>` : ''}
        </div>
        <div class="note-preview">${escapeHtml(n.content || '')}</div>
        <div class="note-actions">
          <button class="case-action-btn" onclick="editNote('${n.id}')">Edit</button>
          <button class="case-action-btn danger" onclick="deleteNote('${n.id}')">Delete</button>
        </div>
      </div>`;
  }).join('');
}

function populateNoteCaseSelect() {
  const sel = document.getElementById('note-case');
  const current = sel.value;
  sel.innerHTML = '<option value="">— Select a case —</option>';
  State.cases.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = c.title;
    if (c.id === current) opt.selected = true;
    sel.appendChild(opt);
  });
}

document.getElementById('new-note-btn').addEventListener('click', () => {
  State.editingNoteId = null;
  document.getElementById('note-modal-title').textContent = 'New Note';
  ['note-title', 'note-content'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('note-date').value = new Date().toISOString().split('T')[0];
  document.getElementById('note-case').value = '';
  populateNoteCaseSelect();
  openModal('modal-note');
});

function editNote(id) {
  const n = State.notes.find(x => x.id === id);
  if (!n) return;
  State.editingNoteId = id;
  document.getElementById('note-modal-title').textContent = 'Edit Note';
  document.getElementById('note-title').value   = n.title || '';
  document.getElementById('note-date').value    = n.date  || '';
  document.getElementById('note-content').value = n.content || '';
  populateNoteCaseSelect();
  document.getElementById('note-case').value = n.caseId || '';
  openModal('modal-note');
}
window.editNote = editNote;

function deleteNote(id) {
  if (!confirm('Delete this note?')) return;
  State.notes = State.notes.filter(n => n.id !== id);
  Storage.saveNotes();
  renderNotes();
  showToast('Note deleted.');
}
window.deleteNote = deleteNote;

document.getElementById('save-note-btn').addEventListener('click', () => {
  const title   = document.getElementById('note-title').value.trim();
  const date    = document.getElementById('note-date').value;
  const caseId  = document.getElementById('note-case').value;
  const content = document.getElementById('note-content').value.trim();

  if (!title && !content) { showToast('Please add a title or content.'); return; }

  if (State.editingNoteId) {
    const idx = State.notes.findIndex(n => n.id === State.editingNoteId);
    if (idx >= 0) {
      State.notes[idx] = { ...State.notes[idx], title, date, caseId, content, updatedAt: Date.now() };
    }
    showToast('Note updated ✓');
  } else {
    State.notes.unshift({ id: genId(), title, date, caseId, content, createdAt: Date.now() });
    showToast('Note saved ✓');
  }

  Storage.saveNotes();
  closeModal('modal-note');
  renderNotes();
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BOTTOM NAV EVENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => navigateTo(btn.dataset.screen));
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OFFLINE DETECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function updateOnlineStatus() {
  const badge = document.getElementById('offline-badge');
  if (!navigator.onLine) badge.classList.add('visible');
  else badge.classList.remove('visible');
}
window.addEventListener('online',  updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SERVICE WORKER REGISTRATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INIT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function init() {
  State.notes = Storage.loadNotes();

  // Load and Index PDFs dynamically
  loadAndIndexCases();

  // Initial GUI renders
  renderMaxims();
  renderDictionary();
  setTermOfDay();

  // Keyboard shortcut — Escape closes modals
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAllModals();
  });

  console.log('%cLexCampus ready ⚖', 'color:#4f72ff;font-weight:700;font-size:16px;');
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAXIM MASTER GAME
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function initGame() {
  if (State.game.total === 0) {
    loadNextQuestion();
  }
  updateGameUI();
}

function loadNextQuestion() {
  const allMaxims = typeof LEGAL_MAXIMS !== 'undefined' ? LEGAL_MAXIMS : [];
  if (allMaxims.length < 4) return;

  const correct = allMaxims[Math.floor(Math.random() * allMaxims.length)];
  const others = allMaxims.filter(m => m.id !== correct.id).sort(() => 0.5 - Math.random()).slice(0, 3);
  
  const options = [...others, correct].sort(() => 0.5 - Math.random());

  State.game.currentQuestion = {
    latin: correct.latin,
    correct: correct.english,
    options: options.map(o => o.english)
  };

  renderGameQuestion();
}

function renderGameQuestion() {
  const q = State.game.currentQuestion;
  document.getElementById('game-latin-text').textContent = q.latin;
  
  const container = document.getElementById('game-options');
  container.innerHTML = q.options.map(opt => `
    <button class="game-opt-btn" onclick="checkAnswer('${opt.replace(/'/g, "\\'")}')">${escapeHtml(opt)}</button>
  `).join('');
  
  document.getElementById('game-feedback').classList.remove('show', 'correct', 'wrong');
}

function checkAnswer(answer) {
  const q = State.game.currentQuestion;
  const isCorrect = answer === q.correct;

  State.game.total++;
  State.game.levelProgress++;
  if (isCorrect) State.game.score += 10;
  
  const feedback = document.getElementById('game-feedback');
  feedback.textContent = isCorrect ? 'Correct! +10' : 'Wrong Answer!';
  feedback.classList.add('show', isCorrect ? 'correct' : 'wrong');

  // Disable buttons
  document.querySelectorAll('.game-opt-btn').forEach(b => {
    b.disabled = true;
    if (b.textContent === q.correct) b.classList.add('reveal-correct');
    else if (b.textContent === answer && !isCorrect) b.classList.add('reveal-wrong');
  });

  updateGameUI();
  
  setTimeout(() => {
    if (State.game.levelProgress >= State.game.maxPerLevel) {
      showLevelSummary();
    } else {
      loadNextQuestion();
    }
  }, 1500);
}

function showLevelSummary() {
  const area = document.getElementById('game-options');
  const level = State.game.level;
  const score = State.game.score;
  const accuracy = Math.round((State.game.score / (State.game.total * 10)) * 100);

  document.getElementById('game-latin-text').textContent = "Level " + level + " Complete!";
  document.querySelector('.game-instruction').textContent = "Nice work! You've completed " + State.game.maxPerLevel + " questions.";

  area.innerHTML = `
    <div class="game-summary">
      <div class="summary-stat">Overall Score: <strong>${score}</strong></div>
      <div class="summary-stat">Accuracy: <strong>${accuracy}%</strong></div>
      <button class="btn-primary" onclick="startNextLevel()" style="margin-top: 10px; width: 100%;">Start Level ${level + 1}</button>
    </div>
  `;
}

function startNextLevel() {
  State.game.level++;
  State.game.levelProgress = 0;
  loadNextQuestion();
  updateGameUI();
}
window.startNextLevel = startNextLevel;
window.checkAnswer = checkAnswer;

function updateGameUI() {
  document.getElementById('game-score-val').textContent = State.game.score;
  const acc = State.game.total > 0 ? Math.round((State.game.score / (State.game.total * 10)) * 100) : 0;
  document.getElementById('game-acc-val').textContent = `${acc}%`;
  
  const levelEl = document.querySelector('.game-level');
  if (levelEl) levelEl.textContent = `LEVEL ${State.game.level} • ${State.game.levelProgress}/${State.game.maxPerLevel}`;
}

document.getElementById('game-reset-btn').addEventListener('click', () => {
  if (!confirm('Reset your score and levels?')) return;
  State.game.score = 0;
  State.game.total = 0;
  State.game.level = 1;
  State.game.levelProgress = 0;
  loadNextQuestion();
  updateGameUI();
});

init();

