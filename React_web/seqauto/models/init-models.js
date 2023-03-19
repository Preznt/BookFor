var DataTypes = require("sequelize").DataTypes;
var _book_list = require("./book_list");
var _collection = require("./collection");
var _collection_book = require("./collection_book");
var _user = require("./user");
var _user_book = require("./user_book");
var _user_paragraph = require("./user_paragraph");

function initModels(sequelize) {
  var book_list = _book_list(sequelize, DataTypes);
  var collection = _collection(sequelize, DataTypes);
  var collection_book = _collection_book(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_book = _user_book(sequelize, DataTypes);
  var user_paragraph = _user_paragraph(sequelize, DataTypes);

  book_list.belongsToMany(user, { as: 'my_username_users', through: user_book, foreignKey: "my_isbn", otherKey: "my_username" });
  user.belongsToMany(book_list, { as: 'my_isbn_book_lists', through: user_book, foreignKey: "my_username", otherKey: "my_isbn" });
  user_book.belongsTo(book_list, { as: "my_isbn_book_list", foreignKey: "my_isbn"});
  book_list.hasMany(user_book, { as: "user_books", foreignKey: "my_isbn"});
  user_paragraph.belongsTo(book_list, { as: "isbn_book_list", foreignKey: "isbn"});
  book_list.hasMany(user_paragraph, { as: "user_paragraphs", foreignKey: "isbn"});
  user_book.belongsTo(user, { as: "my_username_user", foreignKey: "my_username"});
  user.hasMany(user_book, { as: "user_books", foreignKey: "my_username"});
  user_paragraph.belongsTo(user, { as: "username_user", foreignKey: "username"});
  user.hasMany(user_paragraph, { as: "user_paragraphs", foreignKey: "username"});

  return {
    book_list,
    collection,
    collection_book,
    user,
    user_book,
    user_paragraph,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
