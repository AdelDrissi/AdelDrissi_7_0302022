// Import the necessary dependencies //
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sequelize = require('./Db/config');
require('./models/modelss');

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
    await sequelize.sync({ alter: true });
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
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Call the necessary dependencies //
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use((req, res, next) => {
  console.log('requete reçu');
  console.log(req);
  next();
});

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PUT, DELETE, PATCH, OPTIONS'
//   );
//   next();
// });

//Call routes//
app.use('/api/user', userRouter);
app.use('/api/sign', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/likes', likesRouter);
app.use('/api/comments', commentsRouter);

module.exports = app;
