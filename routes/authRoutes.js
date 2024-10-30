const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userControllers = require('../controllers/userControllers');

router.post('/register', authController.register);
// router.post('/login', authController.login);
router.post('/saveData', userControllers)

module.exports = router; 
