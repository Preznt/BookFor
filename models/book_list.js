import Sequelize from "sequelize";
const book_list = (sequelize) => {
  return sequelize.define(
    "book_list",
    {
      isbn: {
        type: Sequelize.DataTypes.STRING(50),
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
      url: {
        type: Sequelize.DataTypes.STRING(500),
        allowNull: true,
      },
      kakao: {
        type: Sequelize.DataTypes.BOOLEAN,
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

export default book_list;
