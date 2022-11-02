import mysql from "mysql2";

// MySQL Server 에 연결 정보 설정
const mysqlconnConfig = {
  host: "localhost",
  port: 3307,
  user: "root",
  password: "!Biz8080",
  database: "world",
};

// mysql db연결하여 연결정보를 dbConnection 객체에 보관
const dbConnection = mysql.createConnection(mysqlconnConfig);
// 연결 객체(dbConnection)를 사용하여 DB 연결
dbConnection.connect(() => {
  console.log("MySQL Connect OK~~");
});

export default dbConnection;
