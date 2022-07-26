const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/comments');
const JWT = require('../middlewares/authentication');
//POST request to the comments route//
router.post('/', JWT, Ctrl.createComment);

//GET request to the comments route//
router.get('/read/:id', JWT, Ctrl.readComment);

//PUT request to the comments route//
router.put('/update/:id', JWT, Ctrl.updateComment);

//DELETE request to the comments route//
router.delete('/delete/:id', JWT, Ctrl.deleteComment);

module.exports = router;
