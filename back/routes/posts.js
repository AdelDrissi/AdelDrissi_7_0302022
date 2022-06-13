// Import the necessary dependencies //
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication');
const Ctrl = require('../controllers/posts');
const upload = require('../middlewares/multer');


router.post('/', upload.single('image'), Ctrl.createPost);

// GET requests to the post route //
router.get('/readpostall', Ctrl.readAllPosts);
router.get('/readOne/:id', Ctrl.readOnePost);

// PUT request to the posts route //
router.put('/updatePost/:id', upload.single('image'), Ctrl.updatePost);

// DELETE request to the posts route //
router.delete('/delete/:id', Ctrl.deletePost);

// Export the router //
module.exports = router;
