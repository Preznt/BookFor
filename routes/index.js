import express from "express";
import DB from "../models/index.js";
import { selectOption } from "./book.js";

const router = express.Router();
const UserBook = DB.models.user_book;

const pageNation = {
  showData: 16,
  showPage: 5,
};

router.get("/:pageNum", async (req, res) => {
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

  pageNation.totalPage = Math.floor(pageNation.totalBook / pageNation.showData);
  console.log(pageNation.totalPage);

  // const offset = (Number(pageNum) - 1) * 16 + 1;
  // const result = await UserBook.findAll({
  //   limit: pageNation.listLimit,
  //   offset: pageNation.offset,
  // });
  // console.log(pageNum);
  const copiedOption = { ...selectOption };
  copiedOption.limit = pageNation.showData;
  copiedOption.offset = 1;
  try {
    const result = await UserBook.findAll(copiedOption);
    return res.json({ pageNation, firstPage: result });
    // const firstPage = await res.json()
  } catch (e) {
    console.log("첫 페이지 데이터 가져오기 실패 \n", e);
  }
});

export default router;
