import express from "express";
const router = express.Router();

import DB from "../models/index.js";
const buyer = DB.models.tbl_buyer;

/* GET home page. */
router.get("/", async (req, res, next) => {
  const buyers = await buyer.findAll();
  res.render("index", { buyers });
});

router.get("/input", (req, res) => {
  res.render("input");
});

router.post("/input", async (req, res) => {
  try {
    await buyer.create(req.body);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
});

router.get("/update", async (req, res) => {
  res.render("update");
});

export default router;
