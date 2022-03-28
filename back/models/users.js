const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = new Sequelize('groupomania', 'root', 'Groupomania', {
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
// Users.pre('save', async function (next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });
Users.sync()
  .then((data) => {
    console.log('Table and model synced successfully !');
  })
  .catch((err) => {
    console.log('Error syning the table and model !');
  });

module.exports = Users;
