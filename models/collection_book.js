import Sequelize from "sequelize";
const collection_book = (sequelize) => {
  return sequelize.define(
    "collection_book",
    {
      c_code: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      isbn: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: "collection_book",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "c_code" }, { name: "isbn" }],
        },
      ],
    }
  );
};

export default collection_book;
