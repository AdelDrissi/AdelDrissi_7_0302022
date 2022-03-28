//IMPORT PACKAGES
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dataBase = require('./models/likes');
const data = require('./models/users');
const posts = require('./models/posts');
const Comments = require('./models/comments');
const userRoutes = require('./routes/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user', userRoutes);

// Import dotenv //
const dotenv = require('dotenv');
dotenv.config();
app.listen(4000, () => {
  console.log('listening on port 4000');
});

const { Sequelize } = require('sequelize');

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: 'localhost',
    name: 'groupomania',
    dialect: 'mysql',
    username: 'root',
    password: 'groupomania',
  }
);
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
