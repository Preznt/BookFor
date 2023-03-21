import express from "express";
import { where } from "sequelize";
import DB from "../models/index.js";
const router = express.Router();

const Collection = DB.models.collection;
const CollectionBook = DB.models.collection_book;
const BookList = DB.models.book_list;
const UserBook = DB.models.user_book;

// 컬렉션에 책 등록하기
router.post("/insert/:name", async (req, res) => {
  const name = req.params.name;
  const isbns = req.body;

  const collection = {
    username: "bjw1403@gmail.com",
    c_name: name,
  };

  const chkDouble = await Collection.findOne({ where: collection });
  if (chkDouble) {
    return res.json({
      CODE: "DOUBLE_NAME",
      MSG: "이미 등록되어 있습니다. 다른 이름을 입력해 주세요.",
    });
  }
  console.log("컬렉션 확인", name);

  await Collection.create(collection);
  const code = await Collection.findOne({
    where: collection,
    attributes: ["c_code"],
    raw: true,
  });

  const cBooks = isbns.map((i) => {
    return {
      c_code: code.c_code,
      isbn: i,
    };
  });
  console.log(cBooks);
  await CollectionBook.bulkCreate(cBooks);
  return res.json("등록");
});

// 컬레션 조회 loader
router.get("/select", async (req, res) => {
  const cNames = await Collection.findAll({
    where: { username: "bjw1403@gmail.com" },
    attributes: ["c_name"],
    raw: true,
  });
  const namesValue = cNames.map((name) => {
    return name.c_name;
  });
  console.log("컬렉션 조회", namesValue);
  return res.json(namesValue);
});

// 컬렉션 아이템 조회
router.get("/", async (req, res) => {
  const { c_name, pageNum, state } = req.query;
  const pageNation = {
    showData: 16,
    showPage: 5,
    defaultPage: 1,
  };

  const selectOption = {
    attributes: [],
    include: [
      {
        model: CollectionBook,
        attributes: [],
      },
      {
        model: BookList,
        attributes: ["title", "authors", "thumbnail"],
      },
    ],
    where: { c_name: c_name, username: "bjw1403@gmail.com" },
    raw: true,
    nest: true,
  };

  if (state) {
    selectOption.include[2] = {
      model: UserBook,
      attributes: ["my_state"],
      where: { my_state: state },
      required: false,
    };
  }
  const cItems = await Collection.findAll(selectOption);
  console.log("확인 확인", cItems);

  pageNation.totalBook = cItems.length;
  pageNation.totalPage = Math.ceil(pageNation.totalBook / pageNation.showData);

  // console.log(JSON.stringify(cItems, null, 2));
  return res.json({ data: cItems, pageNation: pageNation });
});

export default router;
