const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication');
const Ctrl = require('../controllers/users');


// GET requests to the users route //
router.get('/:id', Ctrl.readUser);
// POST requests to the users route //
router.post('/register', authController.signUp);
// PUT requests to the users route //
router.put('/update/:id', Ctrl.updateUser)


module.exports = router;
