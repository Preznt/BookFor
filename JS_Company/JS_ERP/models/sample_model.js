import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_buyer2",
    {
      c_id: {
        type: Sequelize.DataTypes.STRING(5),
        allowNull: false,
        primaryKey: true,
      },
      c_name: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false,
      },
      c_tel: {
        type: Sequelize.DataTypes.STRING(13),
        allowNull: true,
      },
      c_manager: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: true,
      },
      c_mgtel: {
        type: Sequelize.DataTypes.STRING(13),
        allowNull: true,
      },
      c_sum: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "tbl_buyer2",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "st_num" }],
        },
      ],
    }
  );
};
