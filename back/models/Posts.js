const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    static associate = (models) => {
      Posts.belongsTo(models.Users, { foreignKey: 'userId' });

      Posts.hasMany(models.Comments, {
        foreignKey: 'PostId',
      });
    };
    toJSON() {
      return {
        ...this.get(),
        password: undefined,
      };
    }
  }

  Posts.init(
    {
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
    },
    {
      sequelize,
      tableName: 'Posts',
      modelName: 'Posts',
    }
  );

  return Posts;
};
