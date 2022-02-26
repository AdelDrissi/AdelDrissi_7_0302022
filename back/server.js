//IMPORT PACKAGES
const express = require('express');
const app = express();

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
    password: 'Adelwa91480',
  }
);

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
