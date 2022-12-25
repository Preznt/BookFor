import express from "express";
import DB from "../models/index.js";

const UserBook = DB.models.user_book;

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
  console.log(data);
  await UserBook.create(data);
  const result = await UserBook.findAll({
    attributes: ["b_isbn"],
    where: { username: "bjw1403@gmail.com" },
  });
  return res.json(result);
});

export default router;
