import express from "express";
import path from "path";

const app = express();

app.use(express.urlencoded({ extended: false }));

app.set("views", path.join("./views"));
app.set("view engine", "ejs");

import rootRouter from "../routes/root.js";

app.use("/", rootRouter);

export default app;
