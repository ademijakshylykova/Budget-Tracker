// Select elements
const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expensesEl = document.getElementById('expenses');
const descriptionEl = document.getElementById('description');
const amountEl = document.getElementById('amount');
const categoryEl = document.getElementById('category');
const transactionsEl = document.getElementById('transactions');
const filterCategoryEl = document.getElementById('filterCategory');
const filterDateEl = document.getElementById('filterDate');
const clearTransactionsButton = document.getElementById('clearTransactions');

// Load transactions from localStorage if available
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Function to update the UI
function updateUI() {
  const income = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
  const expenses = transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0);
  const balance = income + expenses;

  incomeEl.textContent = income.toFixed(2);
  expensesEl.textContent = (-expenses).toFixed(2);
  balanceEl.textContent = balance.toFixed(2);

  transactionsEl.innerHTML = '';
  transactions.forEach(transaction => {
    const transactionEl = document.createElement('div');
    transactionEl.classList.add('transaction', transaction.amount > 0 ? 'income' : 'expense');
    transactionEl.innerHTML = `
      <span>${transaction.date} - ${transaction.description} (${transaction.category})</span>
      <span>$${transaction.amount.toFixed(2)}</span>
    `;
    transactionsEl.appendChild(transactionEl);
  });

  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Function to add a transaction
function addTransaction() {
  const description = descriptionEl.value.trim();
  const amount = parseFloat(amountEl.value);
  const category = categoryEl.value;
  const date = new Date().toISOString().split('T')[0];

  if (!description || isNaN(amount)) {
    alert('Please enter a valid description and amount.');
    return;
  }

  transactions.push({ description, amount, category, date });
  descriptionEl.value = '';
  amountEl.value = '';
  updateUI();
}

// Function to apply filters
function applyFilters() {
  const filterCategory = filterCategoryEl.value;
  const filterDate = filterDateEl.value;

  const filteredTransactions = transactions.filter(transaction => {
    const categoryMatch = filterCategory ? transaction.category === filterCategory : true;
    const dateMatch = filterDate ? transaction.date === filterDate : true;
    return categoryMatch && dateMatch;
  });

  transactionsEl.innerHTML = '';
