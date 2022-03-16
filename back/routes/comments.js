const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/comments');

//POST request to the comments route//
router.post('/', Ctrl.createComment);

//GET request to the comments route//
router.get('/:postId', Ctrl.readComment);

//PUT request to the comments route//
router.put('/update/:commentId', Ctrl.updateComment);

//DELETE request to the comments route//
router.delete('/delete/:commentId', Ctrl.deleteComment);

module.exports = router;
