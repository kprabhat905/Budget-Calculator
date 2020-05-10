'use strict';
/** @global */
var monthlyIncome = 0,
  budgetEndingDate,
  budget = 0,
  expenses = 0,
  balance = 0,
  savings = 0,
  addedExpenseDate;

var addedExpenseDetails = [];

/**
 * this is a counter for show more functionality of expenses
 */
var count = 5;
/**
 * initially no expense should be visible
 */
var currDisplayed = 0;

/**
 * This is a expense class with description,
 * category, amount, date fields
 */
class Expense {
  constructor(
    budgetDescriptionAddedExpense,
    categoryTypeAddedExpense,
    addedExpenseAmount,
    newlyAddedExpenseDate
  ) {
    this.budgetDescriptionAddedExpense = budgetDescriptionAddedExpense;
    this.categoryTypeAddedExpense = categoryTypeAddedExpense;
    this.addedExpenseAmount = addedExpenseAmount;
    this.newlyAddedExpenseDate = newlyAddedExpenseDate;
  }
}

/**
 * This method will allow only numeric value to enter into fields
 */
function onlyNumberKey(evt) {
  // Only ASCII charactar in that range allowed
  var ASCIICode = evt.which ? evt.which : evt.keyCode;
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false;
  return true;
}

/**
 * This method will clear text Monthly Income
 */
var clearTextMonthlyIncome = function () {
  document.getElementById('monthlyIncome').setAttribute('value', '');
};

/**
 * This method will clear text added expense amount
 */
var clearTextAddedExpenseAmount = function () {
  document.getElementById('addedExpenseAmount').setAttribute('value', '');
};

/**
 * This method will check the budget ending date
 */
var checkBudgetEndingDate = function () {
  var selectedText = getBudgetEndingDate();
  var selectedDate = new Date(selectedText);
  var now = new Date();
  if (selectedDate <= now) {
    alert(
      'Please remember: Budget ending date cannot be current or previous date.'
    );
    setBudgetEndingDate('');
  }
};

/**
 * This method will get monthlo income
 */
var getMonthlyIncome = function () {
  return document.getElementById('monthlyIncome').value;
};

/**
 * This method will get data of monthly income budget ending date
 */
var getDataMonthlyIncomeBudgetEndingDate = function () {
  monthlyIncome = getMonthlyIncome();
  budgetEndingDate = getBudgetEndingDate();

  if (monthlyIncome == '' || monthlyIncome == 0) {
    alert('Please enter details Monthly Income !');
  } else if (budgetEndingDate == '') {
    alert('Please enter Budget Ending Date !');
  } else {
    showResultForm();
    startCountdown();
    updateBudgetValue();
    updateExpensesValue(expenses);
    updateBalanceValue();
    updateSavingsValue();
  }
};

/**
 * This method will show the result form and hides the 1st form
 */
var showResultForm = function () {
  document.getElementsByClassName('budget-submit-container')[0].style.display =
    'none';
  document.getElementsByClassName('submit-result-container')[0].style.display =
    'block';
};

/**
 * This method will start the count down
 */
var startCountdown = function () {
  var deadline = new Date(getBudgetEndingDate());

  var x = setInterval(function () {
    var now = new Date().getTime();
    var t = deadline - now;
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((t % (1000 * 60)) / 1000);
    document.getElementById('day').innerHTML = days;
    document.getElementById('hour').innerHTML = hours;
    document.getElementById('minute').innerHTML = minutes;
    document.getElementById('second').innerHTML = seconds;
    if (t < 0) {
      clearInterval(x);
      document.getElementById('demo').innerHTML = 'TIME UP';
      document.getElementById('day').innerHTML = '0';
      document.getElementById('hour').innerHTML = '0';
      document.getElementById('minute').innerHTML = '0';
      document.getElementById('second').innerHTML = '0';
    }
  }, 1000);
};

/**
 * This method will update the budget value
 */
var updateBudgetValue = function () {
  budget = 0.8 * monthlyIncome;
  budget = parseInt(budget);
  document.getElementById('budget').innerHTML = budget;
};

/**
 * This method will get the budget value
 */
var getBudgetValue = function () {
  return parseInt(document.getElementById('budget').innerHTML);
};

/**
 * This method will update the expenses value
 */
var updateExpensesValue = function (expenses) {
  document.getElementById('expenses').innerHTML = expenses;
};

/**
 * This method will get Expenses value
 */
var getExpensesValue = function () {
  return parseInt(document.getElementById('expenses').innerHTML);
};

/**
 * This method will get monthly income value
 */
var getMonthlyIncomeValue = function () {
  return parseInt(document.getElementById('monthlyIncome').value);
};

/**
 * This method will get balance value
 */
var getBalanceValue = function () {
  return document.getElementById('balance').innerHTML;
};

/**
 * This method will update the balance value
 */
var updateBalanceValue = function () {
  balance = getBudgetValue() - getExpensesValue();
  setBalanceValue(balance);
};

/**
 * This method will set balance value
 */
var setBalanceValue = function (balance) {
  document.getElementById('balance').innerHTML = balance;
};

/**
 * This method will set savings value
 */
var setSavingsValue = function (savings) {
  document.getElementById('savings').innerHTML = savings;
};

/**
 * This method will update savings value
 */
var updateSavingsValue = function () {
  savings = getMonthlyIncomeValue() - getExpensesValue();
  setSavingsValue(savings);
};

/**
 * This method will get updated budget value
 */
var getUpdatedBudgetValue = function () {
  return parseInt(document.getElementById('updatedBudget').value);
};

/**
 * This method will set budget value
 */
var setBudgetValue = function (budgetValue) {
  document.getElementById('budget').innerHTML = budgetValue;
};

/**
 * This method will update new budget
 */
var updateNewBudget = function () {
  let updatedBudget = getUpdatedBudgetValue();

  if (
    updatedBudget > getMonthlyIncomeValue() &&
    updatedBudget < getExpensesValue()
  ) {
    setBudgetValue(updatedBudget);
  } else {
    alert(
      'Please remember: Budget can never be greater than income and less than total expenses till now.'
    );
  }
};

/**
 * This method will get budget ending date
 */
var getBudgetEndingDate = function () {
  return document.getElementById('budgetEndingDate').value;
};

/**
 * This method will set budget ending date
 */
var setBudgetEndingDate = function (budgetEndingDate) {
  document.getElementById('budgetEndingDate').value = budgetEndingDate;
};

/**
 * This method will get added expense date
 */
var getAddedExpenseDate = function () {
  return document.getElementById('addedExpenseDate').value;
};

/**
 * This method will set added expense date
 */
var setAddedExpenseDate = function (addedExpenseDate) {
  document.getElementById('addedExpenseDate').value = addedExpenseDate;
};

/**
 * This method will compare date with budget ending date
 *
 */
var compareDateOfExpenseDate = function () {
  addedExpenseDate = getAddedExpenseDate();

  if (addedExpenseDate > budgetEndingDate) {
    alert('Please enter Date of Expense less than Budget Ending Date !');

    setAddedExpenseDate('yyyy-MM-dd');
  }
};

/**
 *  This method will clear the updated budget text
 */
var clearTextUpdatedBudget = function () {
  document.getElementById('updatedBudget').setAttribute('value', '');
};

/**
 * This method will get added expense amount
 *
 */
var getAddedExpenseAmount = function () {
  return parseInt(document.getElementById('addedExpenseAmount').value);
};

/**
 * This method will set added expense amount
 */
var setAddedExpenseAmount = function (value) {
  document.getElementById('addedExpenseAmount').value = value;
};

/**
 * This method will get category type of added expense
 */
var getCategoryTypeAddedExpense = function () {
  var categoryTypeAddedExpenseDropdown = document.getElementById(
    'addedExpense'
  );
  var categoryTypeAddedExpense =
    categoryTypeAddedExpenseDropdown.options[
      categoryTypeAddedExpenseDropdown.selectedIndex
    ].value;

  return categoryTypeAddedExpense;
};

/**
 * This method will set category type of added expense
 */
var setCategoryTypeAddedExpense = function () {
  document.getElementById('addedExpense').value = 'Other Expenses';
};

/**
 * This method will get budget description
 */
var getBudgetDescription = function () {
  return document.getElementById('budgetDescription').value;
};

/**
 * This method will set budget description
 */
var setBudgetDescription = function (descriptionValue) {
  document.getElementById('budgetDescription').value = descriptionValue;
};

/**
 * This method will get added expense data
 */
var getAddedExpenseData = function () {
  var budgetDescriptionAddedExpense = getBudgetDescription();

  var categoryTypeAddedExpense = getCategoryTypeAddedExpense();

  var addedExpenseAmount = getAddedExpenseAmount();

  var newlyAddedExpenseDate = getAddedExpenseDate();

  if (
    addedExpenseAmount <= getBudgetValue() &&
    addedExpenseAmount <= getBalanceValue()
  ) {
    if (
      budgetDescriptionAddedExpense === '' ||
      categoryTypeAddedExpense === '' ||
      addedExpenseAmount === '' ||
      newlyAddedExpenseDate === ''
    ) {
      alert('Please add all the details for the expense !');
    } else {
      addedExpenseDetails.push(
        new Expense(
          budgetDescriptionAddedExpense,
          categoryTypeAddedExpense,
          addedExpenseAmount,
          newlyAddedExpenseDate
        )
      );
    }
  } else {
    alert('Added Expense amount cannot be zero and greater than balance !');
  }

  addedExpenseDetails.sort(sortingFuntion('newlyAddedExpenseDate', 'asc'));
  updateTotalExpenses();
  clearBudgetDescription();
  clearAddedExpenseAmount();
  setAddedExpenseDate('yyyy-MM-dd');
  deleteRow();
  deleteRow1();
  addExpenseDataToTable(addedExpenseDetails);
  addExpenseDataToTable1(addedExpenseDetails);
};

/**
 * This method will update the pop-up
 */
var updateTableToModal = function () {
  deleteRow1();
  addExpenseDataToTable1(addedExpenseDetails);
};

/**
 * This method will filter the expense data
 */
var filterExpenseData = function () {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById('myInput1');
  filter = input.value.toUpperCase();
  table = document.getElementById('myModalTable');
  tr = table.getElementsByTagName('tr');
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName('td')[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = '';
      } else {
        tr[i].style.display = 'none';
      }
    }
  }
};

/**
 * This method will add the expense data to pop-up table
 */
var addExpenseDataToTable1 = function (addedExpenseDetailsArray) {
  var table = document.getElementById('myModalTable');

  for (var i = 0; i < addedExpenseDetailsArray.length; i++) {
    var tr = document.createElement('tr');
    tr.setAttribute(
      'class',
      addedExpenseDetailsArray[i].categoryTypeAddedExpense
    );

    if (addedExpenseDetailsArray[i].categoryTypeAddedExpense === 'Rent') {
      tr.style.background = '#d6f5f5';
    }
    if (addedExpenseDetailsArray[i].categoryTypeAddedExpense === 'EMI') {
      tr.style.background = '#f5d6e6';
    }
    if (addedExpenseDetailsArray[i].categoryTypeAddedExpense === 'Grocery') {
      tr.style.background = '#ded6f5';
    }
    if (
      addedExpenseDetailsArray[i].categoryTypeAddedExpense === 'Other Expenses'
    ) {
      tr.style.background = '#f5f5d6';
    }
    if (addedExpenseDetailsArray[i].categoryTypeAddedExpense === 'Bills') {
      tr.style.background = '#b3ffe6';
    }

    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var text1 = document.createTextNode(
      addedExpenseDetailsArray[i].budgetDescriptionAddedExpense
    );
    var text2 = document.createTextNode(
      addedExpenseDetailsArray[i].categoryTypeAddedExpense
    );
    var text3 = document.createTextNode(
      addedExpenseDetailsArray[i].addedExpenseAmount
    );
    var text4 = document.createTextNode(
      addedExpenseDetailsArray[i].newlyAddedExpenseDate
    );

    var deleteButton = document.createElement('div');
    deleteButton.setAttribute('class', 'deleteButton_' + i);
    deleteButton.innerHTML =
      '<button  id="deleteButton" onclick="deleteData(this)"></button>';

    if (
      addedExpenseDetailsArray[i].categoryTypeAddedExpense === 'Other Expenses'
    ) {
      var editButton = document.createElement('div');
      editButton.setAttribute('class', 'editButton_' + i);

      editButton.innerHTML =
        '<button  id="editButton" onclick="editData(this)"></button>';
      td5.appendChild(editButton);
    }

    td1.appendChild(text1);
    td2.appendChild(text2);
    td3.appendChild(text3);
    td4.appendChild(text4);
    td5.appendChild(deleteButton);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    table.appendChild(tr);
  }
};

/**
 * This method will delete row in pop-up table
 */
var deleteRow1 = function () {
  try {
    var table = document.getElementById('myModalTable');
    var rowCount = table.rows.length;

    for (var i = 1; i < rowCount; i++) {
      //var row = table.rows[i];
      table.deleteRow(i);
      rowCount--;
      i--;
    }
  } catch (e) {
    alert(e);
  }
};

/**
 * This method will sort the tables by date ascending order
 *
 */
var sortingFuntion = function (key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === 'desc' ? comparison * -1 : comparison;
  };
};

/**
 * This method will add expense data to table
 *
 */
var addExpenseDataToTable = function (addedExpenseDetailsArray) {
  var table = document.getElementById('myTable');
  var length = 0;
  if (addedExpenseDetailsArray.length <= count) {
    length = addedExpenseDetailsArray.length;
  } else {
    length = count;
  }
  for (var i = 0; i < length; i++) {
    var tr = document.createElement('tr');
    tr.setAttribute('class', 'expenseRow');

    if (addedExpenseDetailsArray[i].categoryTypeAddedExpense === 'Rent') {
      tr.style.background = '#d6f5f5';
    }
    if (addedExpenseDetailsArray[i].categoryTypeAddedExpense === 'EMI') {
      tr.style.background = '#f5d6e6';
    }
    if (addedExpenseDetailsArray[i].categoryTypeAddedExpense === 'Grocery') {
      tr.style.background = '#ded6f5';
    }
    if (
      addedExpenseDetailsArray[i].categoryTypeAddedExpense === 'Other Expenses'
    ) {
      tr.style.background = '#f5f5d6';
    }
    if (addedExpenseDetailsArray[i].categoryTypeAddedExpense === 'Bills') {
      tr.style.background = '#b3ffe6';
    }

    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var text1 = document.createTextNode(
      addedExpenseDetailsArray[i].budgetDescriptionAddedExpense
    );
    var text2 = document.createTextNode(
      addedExpenseDetailsArray[i].categoryTypeAddedExpense
    );
    var text3 = document.createTextNode(
      addedExpenseDetailsArray[i].addedExpenseAmount
    );
    var text4 = document.createTextNode(
      addedExpenseDetailsArray[i].newlyAddedExpenseDate
    );

    var deleteButton = document.createElement('div');
    deleteButton.setAttribute('class', 'deleteButton_' + i);
    deleteButton.innerHTML =
      '<button  id="deleteButton" onclick="deleteData(this)"></button>';

    if (
      addedExpenseDetailsArray[i].categoryTypeAddedExpense === 'Other Expenses'
    ) {
      var editButton = document.createElement('div');
      editButton.setAttribute('class', 'editButton_' + i);

      editButton.innerHTML =
        '<button  id="editButton" onclick="editData(this)"></button>';
      td5.appendChild(editButton);
    }

    td1.appendChild(text1);
    td2.appendChild(text2);
    td3.appendChild(text3);
    td4.appendChild(text4);
    td5.appendChild(deleteButton);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    table.appendChild(tr);
  }

  if (length < addedExpenseDetails.length) {
    document.getElementById('myBtn').style.display = 'block';
  } else {
    document.getElementById('myBtn').style.display = 'none';
  }
};

/**
 * This method will close the pop-up on escape
 *
 */
document.onkeydown = closeEscapePopup;
var closeEscapePopup = function (event) {
  var keycode;
  if (window.event) keycode = window.event.keyCode;
  else if (e) keycode = e.which;

  if (keycode == 27) {
    document.getElementById('myModal').style.display = 'none';
  }
};

/**
 * This method will delete the expense data
 *
 */
var deleteData = function (event) {
  var deleteBtnClassName = event.parentNode.className;
  var index = parseInt(
    deleteBtnClassName.substring(deleteBtnClassName.indexOf('_') + 1)
  );
  var copy_addedExpenseDetails = Array.from(addedExpenseDetails);
  copy_addedExpenseDetails.splice(index, 1);
  var allExpenses = document.getElementsByClassName('expenseRow');
  for (var i = 0; i < allExpenses.length; i++) {
    allExpenses[i].remove();
  }

  addedExpenseDetails = copy_addedExpenseDetails;
  deleteRow();
  addExpenseDataToTable(addedExpenseDetails);
  updateTotalExpenses();
};

/**
 * This method will edit the data
 *
 */
var editData = function (event) {
  var editBtnClassName = event.parentNode.className;
  var index = parseInt(
    editBtnClassName.substring(editBtnClassName.indexOf('_') + 1)
  );
  setAddedExpenseDate(addedExpenseDetails[index].newlyAddedExpenseDate);
  setBudgetDescription(
    addedExpenseDetails[index].budgetDescriptionAddedExpense
  );
  setCategoryTypeAddedExpense();
  setAddedExpenseAmount(addedExpenseDetails[index].addedExpenseAmount);

  var copy_addedExpenseDetails = Array.from(addedExpenseDetails);

  copy_addedExpenseDetails.splice(index, 1);
  var allExpenses = document.getElementsByClassName('expenseRow');

  for (var i = 0; i < allExpenses.length; i++) {
    allExpenses[i].remove();
  }

  addedExpenseDetails = copy_addedExpenseDetails;
  closeModalPopup();
  deleteRow();
  addExpenseDataToTable(addedExpenseDetails);
  updateTotalExpenses();
  closeModalPopup();
};

/**
 * This method will close the pop-up
 *
 */
var closeModalPopup = function () {
  modal.style.display = 'none';
};

/**
 * This method will delete the row of table
 *
 */
var deleteRow = function () {
  try {
    var table = document.getElementById('myTable');
    var rowCount = table.rows.length;

    for (var i = 1; i < rowCount; i++) {
      //var row = table.rows[i];
      table.deleteRow(i);
      rowCount--;
      i--;
    }
  } catch (e) {
    alert(e);
  }
};

/**
 * This method will clear the budget description
 *
 */
var clearBudgetDescription = function () {
  document.getElementById('budgetDescription').value = '';
};

/**
 * This method will clear the added expense amount
 *
 */
var clearAddedExpenseAmount = function () {
  document.getElementById('addedExpenseAmount').value = '';
};

/**
 * This method will update total expenses
 *
 */
var updateTotalExpenses = function () {
  let length = addedExpenseDetails.length;

  expenses = 0;

  for (let i = 0; i < length; i++) {
    expenses += parseInt(addedExpenseDetails[i].addedExpenseAmount);
  }

  updateExpensesValue(expenses);
  updateBalanceValue();
  updateSavingsValue();
};
