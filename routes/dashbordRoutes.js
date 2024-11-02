const express = require('express');
const router = express.Router();
const dashbordController = require('../controllers/dashbordController')

router.get('/getLastMonthData', dashbordController.getlast7day);
router.get('/getCategoryTotals', dashbordController.getCatagorySum);

module.exports = router;