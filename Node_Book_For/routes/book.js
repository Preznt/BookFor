import express from "express";
import DB from "../models/index.js";

const BookList = DB.models.book_list;

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await BookList.findAll();
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.json({ error: "SELECT 오류" });
  }
});

router.post("/insert", async (req, res) => {
  const data = req.body;
  console.log(data);
  //   await BookList.create(data);
});

export default router;
