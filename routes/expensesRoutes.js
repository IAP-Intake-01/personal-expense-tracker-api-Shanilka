const express = require('express');
const router = express.Router();
const expensesControllers = require('../controllers/expensesControllers');

router.post('/saveData', expensesControllers.saveData);
router.get('/getAllexpenses', expensesControllers.getAllExpenses);
router.delete('/deleteExpenses/:id', expensesControllers.deleteExpense);
router.put('/updateExpenses', expensesControllers.updateExpense);

module.exports = router;
