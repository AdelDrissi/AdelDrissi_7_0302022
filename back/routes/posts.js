// Import the necessary dependencies //
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication')

router.post('/',);

// GET requests to the post route //
router.get('/', Ctrl.readAllPosts);
router.get('/:id', Ctrl.readOnePost);

// PUT request to the posts route //
router.put('/update/:id', Ctrl.updatePost);

// DELETE request to the posts route //
router.delete('/delete/:id', Ctrl.deletePost);

// Export the router //
http: module.exports = router;
