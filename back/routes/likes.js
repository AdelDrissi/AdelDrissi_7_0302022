const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/likes');


router.post('/', Ctrl.likeOrNot);

module.exports = router;
