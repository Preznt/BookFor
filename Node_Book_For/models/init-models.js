import _book_list from "./book_list.js";
import _user_book from "./user_book.js";
import _user from "./user.js";

const initModels = (sequelize) => {
  const book_list = _book_list(sequelize);
  const user_book = _user_book(sequelize);
  const user = _user(sequelize);
  user.belongsToMany(book_list, {
    as: "my_isbn_book_lists",
    through: user_book,
    foreignKey: "my_username",
  });

  book_list.belongsToMany(user, {
    as: "my_username_users",
    through: user_book,
    foreignKey: "my_isbn",
  });

  user_book.belongsTo(user, {
    foreignKey: "my_username",
  });

  user_book.belongsTo(book_list, {
    foreignKey: "my_isbn",
  });

  // book_list.hasMany(user_book, { as: "user_books", foreignKey: "my_isbn" });

  // user.hasMany(user_book, { as: "user_books", foreignKey: "my_username" });

  return {
    book_list,
    user_book,
    user,
  };
};

export default initModels;
