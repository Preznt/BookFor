import express from "express";
import mysql from "../modules/mysqlDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  const sql = "SELECT * FROM tbl_today";
  mysql.execute(sql, (err, today, fields) => {
    res.render("fd_main", { body: "list", today });
  });
});

router.post("/", (req, res) => {
  const food = req.body;
  console.log(food);
  const sql =
    "INSERT INTO tbl_today(fd_date,fd_food,fd_intake,fd_cal) VALUES(?,?,?,?)";
  mysql.execute(sql, Object.values(food), (err, result, field) => {
    if (err) {
      console.error(err);
    }
    res.redirect("/");
  });
});

export default router;
