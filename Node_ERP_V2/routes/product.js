import express from "express";
import DB from "../models/index.js";

const Product = DB.models.tbl_product;

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.findAll();
  res.render("product/list", { products });
});

router.get("/write", async (req, res) => {
  res.render("product/write", { product: {} });
});

router.get("/detail/:pcode", async (req, res) => {
  const pcode = req.params.pcode;
  try {
    const product = await Product.findOne({ where: { p_code: pcode } });
    res.render("product/detail", { product });
  } catch (err) {
    res.send("SQL 오류!! 데이터를 찾을 수 없음");
  }
});

export default router;
