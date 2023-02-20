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
  // req.body.username = "bjw1403@gmail.com";
  const data = req.body;
  // console.log(data);

  const bookData = {
    isbn: data.isbn.substr(11, 13),
    title: data.title,
    thumbnail: data.thumbnail,
    authors: data.authors[0],
    publisher: data.publisher,
    url: data.url,
  };

  const userBookData = {
    my_username: "bjw1403@gmail.com",
    my_isbn: data.isbn.substr(11, 13),
  };

  // 북리스트에 카카오 API로 받은 데이터 저장
  try {
    await BookList.create(bookData);
  } catch (err) {
    console.log("book_list 추가 오류 \n", err);
  }

  // 내 책에 추가한 책 저장
  try {
    await UserBook.create(userBookData);
  } catch (err) {
    console.log("user_book 추가 오류", err);
  }

  const result = await UserBook.findAll({
    where: { my_username: "bjw1403@gmail.com" },
    include: [
      { model: BookList, attributes: ["title", "thumbnail", "author"] },
    ],
    raw: true,
  });
  // console.log(result);

  return res.json(result);

  // const rList = await result.map((d) => {
  //   return d.my_isbn_book_list;
  // });
  // res.json(rList);

  // const f_book = await result.f_booklist;

  // console.log(result.book_list);

  // const result = await UserBook.findAll({
  //   attributes: ["b_isbn"],
  //   where: { username: "bjw1403@gmail.com" },
  // });
  // return res.json(result);
});

export default router;
