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

router.post("/add", (req, res) => {
  if (!req.body.s_num) {
    res.send(
      "<script>alert('학번을 입력해주세요');window.location.replace('/add');</script>"
    );
  } else if (!req.body.s_name) {
    res.send(
      "<script>alert('이름을 입력해주세요');window.location.replace('/add');</script>"
    );
  } else if (req.body.s_grade < 1 || req.body.s_grade > 4) {
    res.send(
      "<script>alert('학년을 1 ~ 4 로 입력해주세요');window.location.replace('/add');</script>"
    );
  } else {
    res.send("<script>alert('true');window.location.replace('/add');</script>");
  }
});

export default router;
