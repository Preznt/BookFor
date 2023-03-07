import express from "express";
import { Sequelize, where } from "sequelize";
import DB from "../models/index.js";
import fileUp from "../modules/thumbnail_upload.js";
import { chkReg } from "../modules/chkReg.js";

const UserBook = DB.models.user_book;
const BookList = DB.models.book_list;

const router = express.Router();

export const selectOption = {
  attributes: [
    "my_username",
    "my_isbn",
    "my_star",
    "my_state",
    "my_reg_date",
    "my_buy_date",
    "my_start_date",
    "my_done_date",
    [Sequelize.col("book_list.title"), "title"],
    [Sequelize.col("book_list.authors"), "authors"],
    [Sequelize.col("book_list.isbn"), "isbn"],
    [Sequelize.col("book_list.thumbnail"), "thumbnail"],
    [Sequelize.col("book_list.publisher"), "publisher"],
    [Sequelize.col("book_list.url"), "url"],
    [Sequelize.col("book_list.kakao"), "kakao"],
  ],
  where: { my_username: "bjw1403@gmail.com" },
  include: [{ model: BookList, attributes: [] }],
  order: [["my_reg_date", "DESC"]],
  raw: true,
};

// router.get("/", async (req, res) => {

//   try {
//     // const result = await UserBook.findAll({
//     //   attributes: ["b_isbn"],
//     //   where: { username: "bjw1403@gmail.com" },
//     // });
//     // return res.json(result);
//   } catch (err) {
//     console.log(err);
//     return res.json({ error: "SELECT 오류" });
//   }
// });

router.get("/", async (req, res) => {
  const pageNation = {
    showData: 16,
    showPage: 5,
    defaultPage: 1,
  };

  const { pageNum, reqDefault } = req.query;
  console.log(pageNum);
  console.log(reqDefault);

  if (reqDefault) {
    pageNation.defaultPage = reqDefault;
  }

  delete selectOption.where.my_state;

  console.log("선행 라우터");
  // const { pageNum } = req.params;

  try {
    const totalBook = await UserBook.count({
      where: { my_username: "bjw1403@gmail.com" },
    });
    pageNation.totalBook = totalBook;
  } catch (e) {
    console.log("totalBook 개수 SQL 오류 \n", e);
  }

  pageNation.totalPage = Math.ceil(pageNation.totalBook / pageNation.showData);
  console.log(pageNation.totalPage);

  // const offset = (Number(pageNum) - 1) * 16 + 1;
  // const result = await UserBook.findAll({
  //   limit: pageNation.listLimit,
  //   offset: pageNation.offset,
  // });
  // console.log(pageNum);
  const copiedOption = { ...selectOption };
  copiedOption.limit = pageNation.showData;
  copiedOption.offset = pageNation.showData * (pageNum - 1) + 1;
  try {
    const result = await UserBook.findAll(copiedOption);
    return res.json({ pageNation, data: result });
    // const firstPage = await res.json()
  } catch (e) {
    console.log("첫 페이지 데이터 가져오기 실패 \n", e);
  }

  // try {
  //   const result = await UserBook.findAll(selectOption);
  //   // console.log(result);
  //   return res.json(result);
  // } catch (e) {
  //   console.log("첫 로더 데이터 가져오기 오류 \n", e);
  // }
});

router.post("/insert", fileUp.single("upload"), async (req, res) => {
  const detail = JSON.parse(req.body.detail);
  const myDetail = JSON.parse(req.body.myDetail);
  console.log(detail.thumbnail);
  if (req?.file) {
    detail.thumbnail = `/uploads/${req?.file?.filename}`;
  }
  detail.kakao = 0;

  myDetail.my_username = "bjw1403@gmail.com";
  myDetail.my_isbn = detail.isbn;
  // if (!myDetail.my_state) {
  //   myDetail.my_state = "no";
  // }

  const check = await chkReg(detail);
  console.log(check);

  if (check) {
    return res.json(check);
  }

  try {
    await BookList.create(detail);
    await UserBook.create(myDetail);
    return res.json({ complete: true });
  } catch (error) {
    console.log("직접 등록하기 오류 \n", error);
    try {
      await UserBook.update(myDetail, { where: { my_isbn: detail.isbn } });
      await BookList.update(detail, { where: { isbn: detail.isbn } });
      // const result = await UserBook.findOne({
      //   attributes: [
      //     "my_username",
      //     "my_isbn",
      //     "my_star",
      //     "my_state",
      //     "my_reg_date",
      //     "my_buy_date",
      //     "my_start_date",
      //     "my_done_date",
      //     [Sequelize.col("book_list.title"), "title"],
      //     [Sequelize.col("book_list.authors"), "authors"],
      //     [Sequelize.col("book_list.isbn"), "isbn"],
      //     [Sequelize.col("book_list.thumbnail"), "thumbnail"],
      //     [Sequelize.col("book_list.publisher"), "publisher"],
      //     [Sequelize.col("book_list.url"), "url"],
      //   ],
      //   where: { my_username: "bjw1403@gmail.com", my_isbn: detail.isbn },
      //   include: [{ model: BookList, attributes: [] }],
      // });
      // console.log(result);
      // return res.json(result);
    } catch (e) {
      console.log("책 update 오류 \n", e);
    }
  }
});

router.post("/my/insert", async (req, res) => {
  // req.body.username = "bjw1403@gmail.com";
  const data = req.body;
  let isbn = data.isbn;
  if (isbn.length > 14) {
    isbn = isbn.substr(11, 13);
  } else {
    isbn = isbn.substr(1, 13);
  }
  // console.log(data);

  const bookData = {
    isbn: isbn,
    title: data.title,
    thumbnail: data.thumbnail,
    authors: data.authors[0],
    publisher: data.publisher,
    url: data.url,
    kakao: true,
  };

  const userBookData = {
    my_username: "bjw1403@gmail.com",
    my_isbn: isbn,
    my_state: "no",
  };

  const chkIsbn = await BookList.findOne({ where: { isbn: isbn } });
  console.log(chkIsbn);
  if (chkIsbn) {
    return res.json("OVERLAP_ISBN");
  }

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

  const result = await UserBook.findAll(selectOption);
  // console.log(result);

  return res.json(result);
});

router.post("/delete", async (req, res) => {
  console.log(req.body);
  await UserBook.destroy({ where: { my_isbn: req.body } });

  // await 를 안해주면 findAll 하기전에 값(빈값)이 return 되어버린다
  // 삭제 후에 새로고침이 되게 만들었기 때문에 아래 코드는 일단 비활성화
  // const result = await UserBook.findAll(selectOption);

  // return res.json(result);
});

router.get("/state/:data", async (req, res) => {
  const state = req.params.data;
  selectOption.where.my_state = state;
  const result = await UserBook.findAll(selectOption);
  // console.log(result);
  return res.json(result);
});

export default router;
