const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const posts = sequelize.define(
    "posts",
    {
      POST_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      POST_TYPE: {
        type: DataTypes.STRING(30),
        allowNull: false,
        comment: "게시글 종류",
      },
      POST_TITLE: {
        type: DataTypes.STRING(500),
        allowNull: false,
        comment: "게시글 제목",
      },
      POST_CONTENT: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        comment: "게시물 내용",
      },
      POST_CREATE_TIME: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      POST_LIKE: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: "0",
      },
      POST_COMMENTS: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      POST_CREATOR_NAME: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      POST_IMAGE: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      POST_CREATOR_ID: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
          model: "users",
          key: "USER_ID",
        },
      },
    },
    {
      sequelize,
      tableName: "posts",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "POST_ID" }],
        },
        {
          name: "POST_CREATOR_ID_IDX",
          using: "BTREE",
          fields: [{ name: "POST_CREATOR_ID" }],
        },
      ],
    }
  );

  posts.associate = function (models) {
    posts.belongsTo(models.users, {
      as: "POST_USER",
      foreignKey: "POST_CREATOR_ID",
    });
  };

  return posts;
};
