// Import the necessary dependencies //
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// Import routers //
const authRouter = require('./routes/authentication');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const likesRouter = require('./routes/likes');
const commentsRouter = require('./routes/comments');

// Call the necessary dependencies //
const app = express.json();
app.use(cors());
app.use(helmet());

//Call routes//
app.use('/api/users', usersRouter);
app.use('/api/sign', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/likes', likesRouter);
app.use('/api/comments', commentsRouter);

module.exports = app;
