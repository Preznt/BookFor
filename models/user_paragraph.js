import Sequelize from "sequelize";
const user_paragraph = (sequelize) => {
  return sequelize.define(
    "user_paragraph",
    {
      p_code: {
        autoIncrement: true,
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      isbn: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      paragraph: {
        type: Sequelize.DataTypes.STRING(600),
        allowNull: true,
      },
      p_reg_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      tableName: "user_paragraph",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "p_code" }],
        },
      ],
    }
  );
};

export default user_paragraph;
