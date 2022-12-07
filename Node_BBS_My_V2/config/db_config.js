export default {
  development: {
    username: "root",
    password: "!Biz8080",
    database: "bbsDB",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: true,
    // 이게 안돼있으면 저장될떄 utc 방식으로 저장됨
    timezone: "+09:00",
  },
  test: {
    username: "root",
    password: "password",
    database: "sample",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: "password",
    database: "sample",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
