const Sequelize = require('sequelize');

const sequelize = new Sequelize('groupomania', 'root', 'Adelwa91480', {
  dialect: 'mysql',
});
// Indicating the format of LIKES model table //
const Likes = sequelize.define('Likes', {});

Likes.sync()
  .then((data) => {
    console.log('Table and model synced successfully !');
  })
  .catch((err) => {
    console.log('Error syning the table and model !');
  });
