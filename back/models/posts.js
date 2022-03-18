const Sequelize = require('sequelize');
const sequelize = new Sequelize('groupomania', 'root', 'Groupomania', {
  dialect: 'mysql',
});
// Indicating the format of POSTS model table //
const Posts = sequelize.define('Posts', {
  content: {
    type: Sequelize.DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
});

Posts.sync()
  .then((data) => {
    console.log('Table and model synced successfully !');
  })
  .catch((err) => {
    console.log('Error syning the table and model !');
  });

module.exports = Posts;
