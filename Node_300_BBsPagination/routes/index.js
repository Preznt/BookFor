import express from "express";
import DB from "../models/index.js";

const BBS = DB.models.tbl_bbs;
const router = express.Router();

/**
 * 전체 데이터 개수 : DB 의 table 의 개수, listTotalCount
 * 한화면에 보여질 데이터개수 : 10개, listLimit
 * 페이지 Nav 개수 : 10개, pageNavCount
 * 보고자 하는 페이지 번호, pageNum
 */

// 모듈 변수 : 모듈 전체에 대해서 사용할 수 있는 변수
const pageNation = {};

// 선행라우터
router.all("*", async (req, res, next) => {
  const { pageNum, listLimit, pageNavCount } = req.query;

  try {
    pageNation.listTotalCount = await BBS.count();
  } catch (e) {
    console.log(e);
    return {
      CODE: 500,
      CODE_NAME: "BBS_COUNT_ERROR",
      MESSAGE: "BBS 데이터 개수 SQL 오류",
    };
  }

  pageNation.listLimit = Number(listLimit) || 10;
  pageNation.pageNavCount = Number(pageNavCount) || 10;

  // 전체 데이터를 표현하는데 몇페이지가 필요한가를 계산하기
  pageNation.pageTotalCount = Math.ceil(
    pageNation.listTotalCount / pageNation.listLimit
  );

  pageNation.pageNum = Number(pageNum || 1);
  pageNation.offset = (pageNation.pageNum - 1) * pageNation.listLimit;

  // 화면하단 Page Nav 를 표현할 개수중에 시작 Nac Num 계산하기
  pageNation.startNavNum =
    pageNation.pageNum - Math.floor(pageNation.pageNavCount / 2);

  pageNation.startNavNum =
    pageNation.startNavNum < 1 ? 1 : pageNation.startNavNum;

  next();
});

/* GET home page. */

router.get("/", async (req, res, next) => {
  const result = await BBS.findAll({
    limit: pageNation.listLimit,
    offset: pageNation.offset,
  });

  return res.json({ pageNation, bbsList: result });
  // res.render("index", { title: "callor.com Express" });
});

export default router;
