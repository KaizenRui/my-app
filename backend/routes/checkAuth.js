const express = require('express');
const router = express.Router();
const {checkauthController} = require('../controllers/checkauthController');

router.get('/', checkauthController);

module.exports = router;