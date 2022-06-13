const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/comments');


//POST request to the comments route//
router.post('/', Ctrl.createComment);

//GET request to the comments route//
router.get('/read/:id', Ctrl.readComment);

//PUT request to the comments route//
router.put('/update/:id', Ctrl.updateComment);

//DELETE request to the comments route//
router.delete('/delete/:id', Ctrl.deleteComment);

module.exports = router;
