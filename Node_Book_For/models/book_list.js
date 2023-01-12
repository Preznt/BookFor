import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "book_list",
    {
      username: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
        references: {
          model: "user_book",
          key: "username",
        },
      },
      isbn: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      thumbnail: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      authors: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
      publisher: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "book_list",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "isbn" }],
        },
      ],
    }
  );
};
