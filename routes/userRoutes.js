
const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController');
// const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', getUsers);

module.exports = router;
