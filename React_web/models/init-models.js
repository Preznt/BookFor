import _book_list from "./book_list.js";
import _user_book from "./user_book.js";
import _user from "./user.js";
import _user_paragraph from "./user_paragraph.js";
import _collection from "./collection.js";
import _collection_book from "./collection_book.js";

const initModels = (sequelize) => {
  const book_list = _book_list(sequelize);
  const user_book = _user_book(sequelize);
  const user = _user(sequelize);
  const user_paragraph = _user_paragraph(sequelize);
  const collection = _collection(sequelize);
  const collection_book = _collection_book(sequelize);

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

  user.belongsToMany(book_list, {
    through: user_paragraph,
    foreignKey: "username",
  });

  book_list.belongsToMany(user, {
    through: user_paragraph,
    foreignKey: "isbn",
  });

  user_paragraph.belongsTo(user, {
    foreignKey: "username",
  });

  user_paragraph.belongsTo(book_list, {
    foreignKey: "isbn",
  });

  user.hasMany(collection, { foreignKey: "username" });
  collection.belongsToMany(book_list, {
    through: collection_book,
    foreignKey: "isbn",
  });

  // book_list.hasMany(user_book, { as: "user_books", foreignKey: "my_isbn" });

  // user.hasMany(user_book, { as: "user_books", foreignKey: "my_username" });

  return {
    book_list,
    user_book,
    user,
    collection,
    collection_book,
  };
};

export default initModels;
