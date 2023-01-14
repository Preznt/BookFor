var DataTypes = require("sequelize").DataTypes;
var _book_list = require("./book_list");
var _user = require("./user");
var _user_book = require("./user_book");

function initModels(sequelize) {
  var book_list = _book_list(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_book = _user_book(sequelize, DataTypes);

  book_list.belongsToMany(user, {
    as: "my_username_users",
    through: user_book,
    foreignKey: "my_isbn",
    otherKey: "my_username",
  });
  user.belongsToMany(book_list, {
    as: "my_isbn_book_lists",
    through: user_book,
    foreignKey: "my_username",
    otherKey: "my_isbn",
  });
  user_book.belongsTo(book_list, {
    as: "my_isbn_book_list",
    foreignKey: "my_isbn",
  });
  book_list.hasMany(user_book, { as: "user_books", foreignKey: "my_isbn" });
  user_book.belongsTo(user, {
    as: "my_username_user",
    foreignKey: "my_username",
  });
  user.hasMany(user_book, { as: "user_books", foreignKey: "my_username" });

  return {
    book_list,
    user,
    user_book,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
