/*
  Expense Tracker & Analytics — Corrected Code
*/

const els = {
  categorySelect: document.getElementById('categorySelect'),
  typeSelect: document.getElementById('typeSelect'),
  searchInput: document.getElementById('searchInput'),
  sortSelect: document.getElementById('sortSelect'),
  applyBtn: document.getElementById('applyBtn'),
  resetBtn: document.getElementById('resetBtn'),

  txBody: document.getElementById('txBody'),
  sumIncome: document.getElementById('sumIncome'),
  sumExpense: document.getElementById('sumExpense'),
  sumNet: document.getElementById('sumNet'),
  breakdown: document.getElementById('categoryBreakdown'),
};

// --- State ---
let masterTx = [];
let viewTx = [];

// --- Boot ---
(function init() {
  try {
    masterTx = JSON.parse(document.getElementById('transactions-data').textContent.trim());
  } catch (e) {
    console.error('Invalid JSON dataset', e);
    masterTx = [];
  }
  viewTx = [...masterTx];

  populateCategorySelect(masterTx);
  renderAll(viewTx);
  attachEvents();
})();

function attachEvents() {
  els.applyBtn.addEventListener('click', () => {
    const category = els.categorySelect.value;
    const type = els.typeSelect.value;
    const term = els.searchInput.value.trim();
    const sortKey = els.sortSelect.value;

    const filtered = filterTransactions(masterTx, { category, type, term });
    const sorted = sortTransactions(filtered, sortKey);

    viewTx = sorted;
    renderAll(viewTx);
  });

  els.resetBtn.addEventListener('click', () => {
    els.categorySelect.value = '_ALL_';
    els.typeSelect.value = '_ALL_';
    els.searchInput.value = '';
    els.sortSelect.value = 'DATE_DESC';
    viewTx = [...masterTx];
    renderAll(viewTx);
  });
}

/** Fill category select with unique categories + "All" */
function populateCategorySelect(tx) {
  const categories = Array.from(new Set(tx.map(t => t.category))).sort();
  els.categorySelect.innerHTML =
    `<option value="_ALL_">All</option>` +
    categories.map(c => `<option value="${c}">${c}</option>`).join('');
}

/** Render table + summary */
function renderAll(tx) {
  renderTable(tx);
  const sums = summarize(tx);
  renderSummary(sums);
  renderBreakdown(breakdownByCategory(tx));
}

/** Table rows */
function renderTable(tx) {
  els.txBody.innerHTML = tx.map(tr => {
    const amt = formatCurrency(tr.amount);
    const badge =
      tr.type === 'Income'
        ? `<span class="badge-income">Income</span>`
        : `<span class="badge-expense">Expense</span>`;

    return `
      <tr data-test-id="row">
        <td>${escapeHTML(tr.date)}</td>
        <td>${escapeHTML(tr.description)}</td>
        <td>${escapeHTML(tr.category)}</td>
        <td>${badge}</td>
        <td class="right">${amt}</td>
      </tr>
    `;
  }).join('');
}

/** Summary numbers */
function renderSummary({ income, expense, net }) {
  els.sumIncome.textContent = formatCurrency(income);
  els.sumExpense.textContent = formatCurrency(expense);
  els.sumNet.textContent = formatCurrency(net);
}

/** Category breakdown list */
function renderBreakdown(items) {
  if (items.length === 0) {
    els.breakdown.innerHTML = `<div class="break-item"><span class="k">No data</span><span>₹0</span></div>`;
    return;
  }
  els.breakdown.innerHTML = items.map(it => `
    <div class="break-item">
      <span class="k">${escapeHTML(it.category)}</span>
      <span>${formatCurrency(it.total)}</span>
    </div>
  `).join('');
}

/* ========== REQUIRED STUDENT FUNCTIONS ========== */

function filterTransactions(tx, { category, type, term }) {
  return tx.filter(t => {
    const matchCategory = category === '_ALL_' || t.category === category;
    const matchType = type === '_ALL_' || t.type === type;
    const matchTerm = term === '' || t.description.toLowerCase().includes(term.toLowerCase());
    return matchCategory && matchType && matchTerm;
  });
}

function sortTransactions(tx, sortKey) {
  return tx.slice().sort((a, b) => {
    switch (sortKey) {
      case 'DATE_ASC': return new Date(a.date) - new Date(b.date);
      case 'DATE_DESC': return new Date(b.date) - new Date(a.date);
      case 'AMOUNT_ASC': return a.amount - b.amount;
      case 'AMOUNT_DESC': return b.amount - a.amount;
      default: return 0;
    }
  });
}

function summarize(tx) {
  const { income, expense } = tx.reduce((acc, t) => {
    if (t.type === 'Income') acc.income += t.amount;
    if (t.type === 'Expense') acc.expense += t.amount;
    return acc;
  }, { income: 0, expense: 0 });

  return { income, expense, net: income - expense };
}

function breakdownByCategory(tx) {
  const totals = tx.reduce((acc, t) => {
    if (t.type === 'Expense') acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  return Object.entries(totals)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);
}

function formatCurrency(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n);
}

/* Utility */
function escapeHTML(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
