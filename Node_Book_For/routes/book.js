import express from "express";
import DB from "../models/index.js";

const UserBook = DB.models.user_book;
const BookList = DB.models.book_list;

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // const result = await UserBook.findAll({
    //   attributes: ["b_isbn"],
    //   where: { username: "bjw1403@gmail.com" },
    // });
    // return res.json(result);
  } catch (err) {
    console.log(err);
    return res.json({ error: "SELECT 오류" });
  }
});

router.post("/insert", async (req, res) => {
  const data = req.body;
  // const objLength = Object.keys(data).length;
  await UserBook.create(data);

  // const result = await BookList.findAll({
  //   attributes: ["b_isbn"],
  //   where: { username: "bjw1403@gmail.com" },
  // });
  // return res.json(result);
});

router.post("/my/insert", async (req, res) => {
  req.body.username = "bjw1403@gmail.com";
  const data = req.body;
  // console.log(data);
  await BookList.create(data);
  const result = await UserBook.findAll({
    where: { username: "bjw1403@gmail.com" },
    include: "book_list",
    // as: "f_booklist",
    // model: "book_list",
    // right: true,

    // raw: true,
  });
  console.log(result);
  res.json(result);

  // const f_book = await result.f_booklist;

  // console.log(result.book_list);

  // const result = await UserBook.findAll({
  //   attributes: ["b_isbn"],
  //   where: { username: "bjw1403@gmail.com" },
  // });
  // return res.json(result);
});

export default router;
