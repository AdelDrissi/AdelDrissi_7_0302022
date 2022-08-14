// Import the necessary dependencies //
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sequelize = require('./Db/config');
require('./models/modelss');
const path = require('path');

// Connection to the database
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
}
connectDB();

async function synchroDb() {
  try {
    await sequelize.sync();
    console.log('all models were synchronized successfully.');
  } catch (err) {
    console.error('Unable to synchronize with database:', err);
  }
}
synchroDb();
const userRouter = require('./routes/users');
const likesRouter = require('./routes/likes');
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
app.use('/api/likes', likesRouter);
app.use('/api/comments', commentsRouter);
app.use('/image', express.static(path.join(__dirname, 'image')));

module.exports = app;
