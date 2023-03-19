const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_paragraph', {
    p_code: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'user',
        key: 'username'
      }
    },
    isbn: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'book_list',
        key: 'isbn'
      }
    },
    paragraph: {
      type: DataTypes.STRING(600),
      allowNull: true
    },
    p_reg_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'user_paragraph',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "p_code" },
        ]
      },
      {
        name: "user_paragraph_isbn_username_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
          { name: "isbn" },
        ]
      },
      {
        name: "isbn",
        using: "BTREE",
        fields: [
          { name: "isbn" },
        ]
      },
    ]
  });
};
