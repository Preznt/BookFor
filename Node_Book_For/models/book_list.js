import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "book_list",
    {
      b_code: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      b_title: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      b_thumbnail: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      b_author: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
      b_publisher: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
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
