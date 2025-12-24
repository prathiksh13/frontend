// script.js — Completed version

// 1) DOM references
const form = document.getElementById('emiForm');
const principalEl = document.getElementById('principal');
const rateEl = document.getElementById('annualRate');
const tenureEl = document.getElementById('tenureYears');

const emiEl = document.getElementById('emi');
const totalPaymentEl = document.getElementById('totalPayment');
const totalInterestEl = document.getElementById('totalInterest');

// 2) Helper to format numbers with exactly two decimals
function twoDecimals(num) {
  // Fixed to 2 decimals (no currency symbol to match instructions)
  return num.toFixed(2);
}

// 3) EMI calculation function
function calculateEMI(principal, annualRatePercent, years) {
  const P = parseFloat(principal);
  const annualRate = parseFloat(annualRatePercent);
  const n = Math.round(parseFloat(years) * 12); // months
  const r = annualRate / 12 / 100; // monthly rate

  if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || n <= 0) {
    return { emi: 0, totalPayment: 0, totalInterest: 0 };
  }

  let emi = 0;
  if (r === 0) {
    // No interest case
    emi = P / n;
  } else {
    // EMI formula
    emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  }

  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;

  return { emi, totalPayment, totalInterest };
}

// 4) Form submit handler
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // 1. Read and parse inputs
  const principal = parseFloat(principalEl.value.trim());
  const rate = parseFloat(rateEl.value.trim());
  const years = parseFloat(tenureEl.value.trim());

  // 2. Validate inputs
  if (isNaN(principal) || isNaN(rate) || isNaN(years) || principal <= 0 || years <= 0) {
    emiEl.textContent = totalPaymentEl.textContent = totalInterestEl.textContent = 'Please enter valid values.';
    emiEl.style.color = totalPaymentEl.style.color = totalInterestEl.style.color = 'red';
    return;
  }

  // 3. Calculate EMI
  const { emi, totalPayment, totalInterest } = calculateEMI(principal, rate, years);

  // 4. Display results
  emiEl.textContent = twoDecimals(emi);
  totalPaymentEl.textContent = twoDecimals(totalPayment);
  totalInterestEl.textContent = twoDecimals(totalInterest);

  // Reset color in case of valid input
  emiEl.style.color = totalPaymentEl.style.color = totalInterestEl.style.color = '#111';
});
