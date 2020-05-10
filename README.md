# Budget-Calculator
A single page web application is created, in which a user can manage their monthly expenses. 

Table of contents
--------------------
1. Overview
2. Constraints
3. Tools used
4. Implementation
5. FAQs

OVERVIEW
--------
1.	User should provide monthly income and budget ending date as an input to a form which appears when user lands on the application.
2.	On Submitting above details, form should close, and user can see the main screen which contains – 
    a.	Budget		: 20% less than the income as default.
    b.	Expenses	: total amount of expenses added till now (Rs 0 as default)
    c.	Balance		: (Budget – Expenses)
    d. 	Savings		: (Income - Expenses)
    e.	Form to update the Budget (User can increase/decrease the budget).
    f.	Form to add an expense, this contains 
        1.	Budget Description, 
        2. 	Category-Fixed (Rent, EMI, Grocery, Bills), Variable (all other than fixed)
        3.	Amount – in Rs.
        4.	Date – date of the expense.
    g.	List of 5 most recent Expenses with a view all button on bottom (if expenses are more than 5) and delete option on each expense.
    h.	Running timer showing time (Days: Hours: Minutes: Seconds) left in the month end based on the budget ending date.

3.	On click of View all, list of all the expenses will be available (popup can be used here if required), List should be sorted by date with most recent on top. User can also delete multiple expenses at once in this list or update the amount of any expense.

CONSTRAINTS
-----------
 *  User cannot proceed without providing monthly income and budget ending date.
 *  Budget ending date cannot be current or previous date.
 *  Budget can never be greater than income and less than total expenses till now.
 *  Expense amount cannot be zero and greater than balance.
 *  Fixed expenses cannot be deleted once added instead amount can be updated for both categories.
 *  All expenses list that opens on click of View all can only be closed on pressing Esc key on keyboard.
 *  On Deleting expense/expenses, all the data on main screen should get updated.
 * 	Different category of expense should be presented with different styles (colour/icon/background etc.)
 *  An option to filter the list of expenses in the popup based on category only (All, Fixed, Variable) is available.

TOOLS USED
----------
Below are tools used:
1.	HTML
2.	CSS
3.	Javascript

IMPLEMENTATION
--------------
1. Basic core concepts ff Javascript are used.
2. For editing the "Other Expenses" expense from the Expense table get removed and updated to "Add To Expense" section, so that user can edit the expense and re-submit the expense.

FAQs
----
 *  If user is not able to input "Date of Expense" in Add Expense section, remember:
     "Date of Expense" should be less than "Budget ending date"
 * If user is not able to update the budget, remember:
      Budget should be less than total expenses till now.
 
