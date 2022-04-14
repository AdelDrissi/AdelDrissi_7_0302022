const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = new Sequelize('groupomania', 'root', 'Adelwa91480', {
  dialect: 'mysql',
});
// Indicating the format of USERS model table //
const Users = sequelize.define('Users', {
  username: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.DataTypes.STRING,
    unique: true,
  },
  image: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    defaultValue: 'http://localhost:4000/image/default_user.png',
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  biography: {
    type: Sequelize.DataTypes.TEXT,
    allowNull: false,
  },
});
Users.sync()
  .then((data) => {
    console.log('Table and model synced successfully !');
  })
  .catch((err) => {
    console.log('Error syning the table and model !');
  });

module.exports = Users;
