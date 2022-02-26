// Import the necessary dependencies //
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

// Import routers //
const authRouter = require('./routes/authentication');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const likesRouter = require('./routes/likes');
const commentsRouter = require('./routes/comments');

// Call the necessary dependencies //
const app = express();
app.use(cors());
app.use(helmet());

app.get('/', async function (req, res) {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);

    //Call routes//
    app.use('/api/users', usersRouter);
    app.use('/api/sign', authRouter);
    app.use('/api/posts', postsRouter);
    app.use('/api/likes', likesRouter);
    app.use('/api/comments', commentsRouter);

    module.exports = app;
  }
});
