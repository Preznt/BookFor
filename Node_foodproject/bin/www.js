import http from "http";
import app from "./app.js";

const server = http.createServer(app);

const serverConfig = {
  host: "localhost",
  port: 3308,
};

server.on("listening", () => {
  console.log(
    `server start!! http://${serverConfig.host}:${serverConfig.port}`
  );
});

server.listen(serverConfig);
