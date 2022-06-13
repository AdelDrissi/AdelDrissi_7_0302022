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
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
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
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
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
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  biography: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

const Likes = sequelize.define('Likes', {
  LikesId: {
    type: DataTypes.SMALLINT(6),
    primaryKey: true,
    autoIncrement: true,
  },
});
Users.hasMany(Posts, {
  as: 'posts',
  onDelete: 'CASCADE',
  foreignKey: 'userId',
});

Posts.belongsTo(Users);

Users.hasMany(Likes, { as: 'likes', onDelete: 'CASCADE' });

Likes.belongsTo(Users,);

Users.hasMany(Comments, { as: 'comments', onDelete: 'CASCADE' });

Comments.belongsTo(Users,{
  foreignKey: 'postid'
});

Posts.hasMany(Comments, { as: 'comments', onDelete: 'CASCADE' });

Comments.belongsTo(Posts);

module.exports = { Comments, Users, Posts, Likes };
