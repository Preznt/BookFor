import Sequelize from "sequelize";
const user_book = (sequelize) => {
  return sequelize.define(
    "user_book",
    {
      my_username: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
        references: {
          model: "user",
          key: "username",
        },
      },
      my_isbn: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        references: {
          model: "book_list",
          key: "isbn",
        },
      },
      my_star: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      my_state: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: true,
      },
      my_reg_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      my_buy_date: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: true,
      },
      my_start_date: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: true,
      },
      my_done_date: {
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
          fields: [{ name: "my_username" }, { name: "my_isbn" }],
        },
        {
          name: "f_books",
          using: "BTREE",
          fields: [{ name: "my_isbn" }],
        },
      ],
    }
  );
};

export default user_book;
