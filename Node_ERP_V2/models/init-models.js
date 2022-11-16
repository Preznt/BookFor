import _tbl_buyer from "./tbl_buyer.js";
import _tbl_users from "./tbl_users.js";

const initModels = (sequelize) => {
  const tbl_buyer = _tbl_buyer(sequelize);
  const tbl_users = _tbl_users(sequelize);

  return {
    tbl_users,
    tbl_buyer,
  };
};

export default initModels;
