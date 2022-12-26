import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "user_book",
    {
      isbn: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
      },

      b_paragraph: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      b_location: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: true,
      },
      b_state: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: true,
      },
      b_reg_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      b_buy_date: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: true,
      },
      b_start_date: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: true,
      },
      b_done_date: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "user_book",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "usernamename", name: "isbn" }],
        },
      ],
    }
  );
};
