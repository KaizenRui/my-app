const express = require('express');
const router = express.Router();
const { login, dashboard, logout } = require('../controllers/authController');

router.post('/login', login);
//router.get('/dashboard', dashboard);
router.post('/logout', logout);


module.exports = router;