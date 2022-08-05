const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication');
const Ctrl = require('../controllers/users');
const upload = require('../middlewares/multer');
const JWT = require('../middlewares/authentication');

// GET requests to the users route //
router.get('/:id', Ctrl.readUser);
// POST requests to the users route //
router.post('/register', authController.signUp);
// PUT requests to the users route //
router.put('/update/:id', upload.single('image'), JWT, Ctrl.updateUser);
// DELETE requests to the users route //
router.delete('/delete/:id', Ctrl.deleteUser);

module.exports = router;