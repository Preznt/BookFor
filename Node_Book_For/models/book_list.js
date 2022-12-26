import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "book_list",
    {
      b_code: {
        autoIncrement: true,
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      b_isbn: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
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
          fields: [{ name: "b_code" }],
        },
      ],
    }
  );
};
