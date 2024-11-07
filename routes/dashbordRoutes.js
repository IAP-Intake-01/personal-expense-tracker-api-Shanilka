const express = require('express');
const router = express.Router();
const dashbordController = require('../controllers/dashbordController')

router.get('/getLastMonthData', dashbordController.getlast7day);
router.get('/getCategoryTotals', dashbordController.getCatagorySum);
router.get('/expense-summary/:userEmail', dashbordController.getExpensesTotal)
router.get('/getCatogoryTotal/:userEmail', dashbordController.getCatogoryTotal)

module.exports = router;