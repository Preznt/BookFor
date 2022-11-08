import mysql from "mysql2";

const mysqlConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3307",
  password: "!Biz8080",
  database: "fooddb",
});

export default mysqlConn;
