import express from "express";
import mysql from "../modules/mysqlDB.js";
const router = express.Router();

router.get("/", (req, res) => {
  const studentSelect = "SELECT * FROM tbl_student";
  mysql.query(studentSelect, (err, students, fields) => {
    res.render("student", { students });
  });
});

router.post("/", (req, res) => {
  const name = req.body.s_name;
  const containStudent =
    "SELECT * FROM tbl_student WHERE st_name LIKE concat('%',?,'%')";
  mysql.execute(containStudent, [name], (err, students, fields) => {
    res.render("student", { students });
  });
});

router.get("/add", (req, res) => {
  const studentSelect = "SELECT * FROM tbl_student";
  mysql.query(studentSelect, (err, students, fields) => {
    res.render("addStudent", { students });
  });
});

export default router;
