const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/authentication');
const JWT = require('../middlewares/authentication');

// POST requests to the authentication route //
router.post('/signup', Ctrl.signUp);
router.post('/signin', Ctrl.signIn);
// GET request to the authentication route //
router.get('/auth', JWT, Ctrl.auth);

module.exports = router;
