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

router.post("/write", async (req, res) => {
  try {
    await Product.create(req.body);
    res.redirect("/product");
  } catch (error) {
    console.error(error);
  }
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

router.get("/update/:pcode", async (req, res) => {
  const pcode = req.params.pcode;
  try {
    const product = await Product.findOne({ where: { p_code: pcode } });
    res.render("product/write", { product });
  } catch (err) {
    res.send("SQL 오류!! 데이터를 찾을 수 없음");
  }
});

router.post("/update/:pcode", async (req, res) => {
  const pcode = req.body.p_code;
  try {
    await Product.update(req.body, { where: { p_code: pcode } });
    res.redirect(`/product/detail/${pcode}`);
  } catch (err) {
    res.send("SQL 오류");
  }
});

router.get("/delete/:pcode", async (req, res) => {
  const pcode = req.params.pcode;
  try {
    await Product.destroy({ where: { p_code: pcode } });
    res.redirect("/product");
  } catch (err) {
    res.send("SQL 오류");
  }
});

export default router;
