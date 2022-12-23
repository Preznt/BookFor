import _book_list from "./book_list.js";
const initModels = (sequelize) => {
  const book_list = _book_list(sequelize);

  return {
    book_list,
  };
};

export default initModels;
