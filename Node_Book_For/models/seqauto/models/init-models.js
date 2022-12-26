var DataTypes = require("sequelize").DataTypes;
var _book_list = require("./book_list");
var _user = require("./user");
var _user_book = require("./user_book");

function initModels(sequelize) {
  var book_list = _book_list(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_book = _user_book(sequelize, DataTypes);


  return {
    book_list,
    user,
    user_book,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
