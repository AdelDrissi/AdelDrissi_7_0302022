const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication');
const Ctrl = require('../controllers/users');
const upload = require('../middlewares/multer');
const JWT = require('../middlewares/authentication');

// GET requests to the users route //
router.get('/read/:id', [JWT.auth], Ctrl.readUser);
// POST requests to the users route //
router.post('/register', [JWT.auth], authController.signUp);
// PUT requests to the users route //
router.put('/update/:id', [JWT.auth], upload.single('image'), Ctrl.updateUser);
// DELETE requests to the users route //
router.delete('/delete/:id', [JWT.auth], Ctrl.deleteUser);

module.exports = router;
