import mysql from "mysql2";

const mysqlOption = {
  host: "localhost",
  user: "root",
  port: "3306",
  password: "!Biz8080",
  database: "schooldb",
};

const mysqlConn = mysql.createConnection(mysqlOption);

export default mysqlConn;
