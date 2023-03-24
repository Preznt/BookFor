import express from "express";
import { Sequelize } from "sequelize";
import DB from "../models/index.js";
import fileUp from "../modules/thumbnail_upload.js";
import { chkReg } from "../modules/chkReg.js";

const UserBook = DB.models.user_book;
const BookList = DB.models.book_list;

const router = express.Router();

const pageNation = {
  showData: 14,
  showPage: 5,
  defaultPage: 1,
};

export const selectOption = {
  attributes: [
    [Sequelize.col("book_list.title"), "title"],
    [Sequelize.col("book_list.authors"), "authors"],
    [Sequelize.col("book_list.isbn"), "isbn"],
    [Sequelize.col("book_list.thumbnail"), "thumbnail"],
  ],
  where: { my_username: "bjw1403@gmail.com" },
  include: [{ model: BookList }],
  order: [["my_reg_date", "DESC"]],
  limit: pageNation.showData,
  raw: true,
};

router.get("/", async (req, res) => {
  const { pageNum, reqDefault, state } = req.query;
  console.log(pageNum);
  console.log(reqDefault);
  console.log("state", state);

  console.log("선행 라우터");

  try {
    const totalBook = await UserBook.count(
      state === "undefined" || state === undefined
        ? {
            where: { my_username: "bjw1403@gmail.com" },
          }
        : { where: { my_username: "bjw1403@gmail.com", my_state: state } }
    );

    pageNation.totalBook = totalBook;
    console.dir(totalBook);
    if (Number(totalBook) < 1) {
      pageNation.defaultPage = 0;
    } else if (reqDefault) {
      pageNation.defaultPage = reqDefault;
    } else {
      pageNation.defaultPage = 1;
    }
  } catch (e) {
    console.log("totalBook 개수 SQL 오류 \n", e);
  }

  pageNation.totalPage = Math.ceil(pageNation.totalBook / pageNation.showData);

  selectOption.offset = pageNation.showData * (pageNum - 1);
  try {
    delete selectOption.where.my_state;
    if (state != "undefined" && state != undefined)
      selectOption.where.my_state = state;

    const result = await UserBook.findAll(selectOption);
    return res.json({ pageNation, data: result });

    // const firstPage = await res.json()
  } catch (e) {
    console.log("첫 페이지 데이터 가져오기 실패 \n", e);
  }
});

// 직접 입력 등록
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
      return res.json({ update: true });
    } catch (e) {
      console.log("책 update 오류 \n", e);
    }
  }
});

// 검색창에서 추가버튼을 클릭시 내서재 등록 및 책 정보 저장
router.post("/my/insert", async (req, res) => {
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

  // 전에 등록한 책인지 검사하는 부분
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

  try {
    const result = await UserBook.findAll(selectOption);
    return res.json(result);
  } catch (e) {
    console.log("user_book select 오류", e);
  }

  // console.log(result);
});

// 책 디테일 화면
router.get("/detail/:isbn", async (req, res) => {
  const { isbn } = req.params;
  const bookInfo = await UserBook.findAll({
    where: { my_username: "bjw1403@gmail.com", my_isbn: isbn },
    include: [{ model: BookList }],
    order: [["my_reg_date", "DESC"]],
    // limit: pageNation.showData,
    raw: true,
    nest: true,
  });
  console.log(bookInfo);
  return res.json(bookInfo);
});

// 내 서재에서 삭제
router.post("/delete", async (req, res) => {
  console.log(req.body);
  await UserBook.destroy({ where: { my_isbn: req.body } });

  // await 를 안해주면 findAll 하기전에 값(빈값)이 return 되어버린다
  // 삭제 후에 새로고침이 되게 만들었기 때문에 아래 코드는 일단 비활성화
  // const result = await UserBook.findAll(selectOption);

  // return res.json(result);
});

export default router;
