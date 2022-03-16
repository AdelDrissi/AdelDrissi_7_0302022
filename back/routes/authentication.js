const express = require('express');
const router = express.Router();

// POST requests to the authentication route //
router.post('/signup', Ctrl.signup);
router.post('/signin', Ctrl.signin);
// GET request to the authentication route //
router.get('/auth', [JWT.auth], Ctrl.auth);

module.exports = router;
