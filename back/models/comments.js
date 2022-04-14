const Sequelize = require('sequelize');

const sequelize = new Sequelize('groupomania', 'root', 'Adelwa91480', {
  dialect: 'mysql',
});
// Indicating the format of COMMENTS model table //
const Comments = sequelize.define('Comments', {
  comment: {
    type: Sequelize.DataTypes.TEXT,
    allowNull: false,
  },
  username: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
});

Comments.sync()
  .then((data) => {
    console.log('Table and model synced successfully !');
  })
  .catch((err) => {
    console.log('Error syning the table and model !');
  });
