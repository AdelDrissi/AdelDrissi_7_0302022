const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate = (models) => {
      Users.hasMany(models.Posts, { foreignKey: 'userId' });

      Users.hasMany(models.Comments, {
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

  Users.init(
    {
      userId: {
        type: DataTypes.SMALLINT(6),
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
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
        allowNull: true,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: 'Users',
      modelName: 'Users',
    }
  );
  return Users;
};
