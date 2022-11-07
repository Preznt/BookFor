import express from "express";
import mysql from "../modules/mysqlDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  const sql = "SELECT * FROM tbl_today";
  mysql.execute(sql, (err, today, fields) => {
    res.render("fd_main", { body: "list", today });
  });
});

export default router;
