const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  const users = sequelize.define(
    "users",
    {
      USER_ID: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      USER_PWD: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      USER_NAME: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      USER_LASTLOGIN: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      USER_POSITION: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
    },
  );

  users.associate = function (models) {
    users.hasMany(models.posts, {
      foreignKey: "POST_CREATOR_ID",
    });
  };

  return users;
};
