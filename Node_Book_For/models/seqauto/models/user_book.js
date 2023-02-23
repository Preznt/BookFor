const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_book', {
    my_username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'username'
      }
    },
    my_isbn: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'book_list',
        key: 'isbn'
      }
    },
    my_paragraph: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    my_location: {
      type: DataTypes.STRING(125),
      allowNull: true
    },
    my_state: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    my_reg_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    my_buy_date: {
      type: DataTypes.STRING(125),
      allowNull: true
    },
    my_start_date: {
      type: DataTypes.STRING(125),
      allowNull: true
    },
    my_done_date: {
      type: DataTypes.STRING(125),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_book',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "my_username" },
          { name: "my_isbn" },
        ]
      },
      {
        name: "user_book_my_isbn_my_username_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "my_username" },
          { name: "my_isbn" },
        ]
      },
      {
        name: "f_books",
        using: "BTREE",
        fields: [
          { name: "my_isbn" },
        ]
      },
    ]
  });
};
