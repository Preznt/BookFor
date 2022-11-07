import express from "express";
import path from "path";
import moment from "moment";

const app = express();

import indexRouter from "../routes/index.js";
import foodRouter from "../routes/food.js";

app.set("views", path.join("views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join("public")));

// exports.index = function (req, res) {
//   res.render("index", { moment: moment });
// };

app.use("/", indexRouter);
app.use("/food", foodRouter);

export default app;
