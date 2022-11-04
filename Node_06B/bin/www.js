import http from "http";
import app from "./app.js";
const server = http.createServer(app);
const serverOption = {
  host: "localhost",
  port: 3000,
};
server.on("listening", () => {
  console.log(
    `server start!! http://${serverOption.host}:${serverOption.port}`
  );
});
server.listen(serverOption);
