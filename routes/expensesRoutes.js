const express = require('express');
const router = express.Router();
const expensesControllers = require('../controllers/expensesControllers');

router.post('/saveData', expensesControllers.saveData);
router.get('/expenses', expensesControllers.getAllExpenses);

module.exports = router;
