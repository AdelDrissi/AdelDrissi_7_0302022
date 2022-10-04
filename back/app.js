// Import the necessary dependencies //
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const db = require('./models');

db.sequelize.sync({});

const userRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const authRouter = require('./routes/authentication');
const req = require('express/lib/request');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  
};

// Call the necessary dependencies //
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

//Call routes//
app.use('/api/user', userRouter);
app.use('/api/sign', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);
app.use('/image', express.static(path.join(__dirname, 'image')));

module.exports = app;
