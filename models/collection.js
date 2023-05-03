import Sequelize from "sequelize";
const collection = (sequelize) => {
  return sequelize.define(
    "collection",
    {
      c_code: {
        autoIncrement: true,
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      c_name: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      username: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "collection",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "c_code" }],
        },
      ],
    }
  );
};

export default collection;
