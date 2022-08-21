const sequelize = require('../Db/config');
const { DataTypes } = require('sequelize');

const Comments = sequelize.define('Comments', {
  CommentsId: {
    type: DataTypes.SMALLINT(6),
    primaryKey: true,
    autoIncrement: true,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  // username: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
});

const Posts = sequelize.define('Posts', {
  PostId: {
    type: DataTypes.SMALLINT(6),
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
const Users = sequelize.define('Users', {
  userId: {
    type: DataTypes.SMALLINT(6),
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'http://localhost:3000/image/default_user.png',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  biography: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  },
});

Posts.belongsTo(Users, {});

Users.hasMany(Comments, { as: 'comments', onDelete: 'CASCADE' });

Comments.belongsTo(Users, {
  foreignKey: 'postid',
});

Posts.hasMany(Comments, { as: 'comments', onDelete: 'CASCADE' });

Comments.belongsTo(Posts);

module.exports = { Comments, Users, Posts };
