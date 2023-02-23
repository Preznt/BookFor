const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('book_list', {
    isbn: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    thumbnail: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    authors: {
      type: DataTypes.STRING(125),
      allowNull: false
    },
    publisher: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'book_list',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "isbn" },
        ]
      },
    ]
  });
};
