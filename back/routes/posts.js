// Import the necessary dependencies //
const express = require('express');
const router = express.Router();

// POST request to the post route //
router.post('/', Ctrl.createPost);

// GET requests to the post route //
router.get('/', Ctrl.readAllPosts);
router.get('/:id', Ctrl.readOnePost);

// PUT request to the posts route //
router.put('/update/:id', Ctrl.updatePost);

// DELETE request to the posts route //
router.delete('/delete/:id', Ctrl.deletePost);

// Export the router //
module.exports = router;
