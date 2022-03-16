const Sequelize = require('sequelize');

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

Users.associate = (models) => {
  Users.hasMany(models.Posts, {
    onDelete: 'cascade',
  });
  Users.hasMany(models.Likes, {
    onDelete: 'cascade',
  });
};

module.exports = Users;
