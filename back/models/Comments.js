const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    static associate = (models) => {
     this.belongsTo(models.Posts, { foreignKey: 'PostId' });
      this.belongsTo(models.Users, {
        foreignKey: 'userId',
      });
    };

    toJSON() {
      return {
        ...this.get(),
        password: undefined,
      };
    }
  }

  Comments.init(
    {
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
    },
    {
      sequelize,
      tableName: 'Comments',
      modelName: 'Comments',
    }
  );
  return Comments;
};
