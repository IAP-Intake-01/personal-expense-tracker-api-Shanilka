const express = require('express');
const router = express.Router();
const dashbordController = require('../controllers/dashbordController')

router.get('/getLast7dayData', dashbordController.getlast7day);

module.exports = router;