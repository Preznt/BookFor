import express from "express";
import mysql from "../modules/mysqlDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  const citySelect = "SELECT * FROM country Limit 0,10";
  mysql.query(citySelect, (error, result, fields) => {
    /**
     * 국가 = {code, name, ...}
     * result = [{국가},{국가},{국가}]
     */
    // res.json(result);
    // result 값을 countrys라는 이름으로 바꿔서 country.ejs라는 파일로 보내서 랜더링하겠다
    res.render("country", { countrys: result });
  });
});

// 주소창에 http://localhost:3000/country/list 입력하고
// Enter 를 눌렀을 때 처리하는 URI
// 메뉴에서 link를 클릭했을 때 처리하는 URI
router.get("/list", (req, res) => {
  res.render("country", { countrys: [] });
});

// get 이나 post 를 method 라고 하고 이게 다르면
// 주소가 같아도 다르게 실행된다
router.post("/list", (req, res) => {
  // form 의 input 에 설정된 name(c_name) 변수값을 setter하여
  // name 변수에 저장
  const name = req.body.c_name;
  console.log(name);
  const sql =
    " SELECT * FROM country " + " WHERE name LIKE " + " CONCAT('%',?,'%') ";
  mysql.execute(sql, [name], (err, countrys, field) => {
    res.render("country", { countrys });
  });
});

router.get("/:name/get", (req, res) => {
  const name = req.params.name;
  const citySelect = "SELECT * FROM country WHERE Name = ? Limit 0,1";
  mysql.execute(citySelect, [name], (error, countrys, fields) => {
    // res.json(result);
    res.render("country", { countrys });
  });
});

router.get("/:name/like", (req, res) => {
  const name = req.params.name;
  const citySelect =
    "SELECT * FROM country WHERE Name like concat('%',?,'%') ORDER BY Name";
  mysql.execute(citySelect, [name], (error, countrys, fields) => {
    res.render("country", { countrys });
  });
});

export default router;
