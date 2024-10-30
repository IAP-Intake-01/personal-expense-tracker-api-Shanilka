const express = require('express');
const router = express.Router();
const expensesControllers = require('../controllers/expensesControllers');

router.post('/saveData', expensesControllers.saveData);
router.get('/getAllexpenses', expensesControllers.getAllExpenses);
router.delete('/deleteExpenses/:id', expensesControllers.deleteExpense);

module.exports = router;
