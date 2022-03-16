const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication');

router.post('/register', authController.signUp);

module.exports = router;
