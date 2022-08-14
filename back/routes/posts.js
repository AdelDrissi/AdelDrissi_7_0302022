// Import the necessary dependencies //
const express = require('express');
const upload = require('../middlewares/multer')
const router = express.Router();
const Ctrl = require('../controllers/posts');
const JWT = require('../middlewares/authentication');
const multer = require('../middlewares/multer');

router.post('/', upload.single('image') , Ctrl.createPost);

// GET requests to the post route //
router.get('/readpostall', JWT, Ctrl.readAllPosts);
router.get('/readOne/:id',  upload.single('image') , JWT, Ctrl.readOnePost);

// PUT request to the posts route //
router.put('/updatePost/:id',  upload.single('image') , Ctrl.updatePost);

// DELETE request to the posts route //
router.delete('/delete/:id', JWT, Ctrl.deletePost);

// Export the router //
module.exports = router;
