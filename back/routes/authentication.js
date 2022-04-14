const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/authentication');

// POST requests to the authentication route //
router.post('/signup', Ctrl.signUp);
router.post('/', Ctrl.signIn);
// GET request to the authentication route //
// router.get('/auth', [JWT.auth], Ctrl.auth);

module.exports = router;
