const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');

router.post('/saveData', userControllers.saveData);
router.get('/expenses', userControllers.getAllExpenses);

module.exports = router;
