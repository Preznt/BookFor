import express from "express";
import DB from "../models/index.js";

const router = express.Router();
const UserBook = DB.models.user_book;

router.get("/", async (req, res) => {
  try {
    const result = await UserBook.findAll({
      where: { username: "bjw1403@gmail.com" },
    });
    console.log(result);
    // return res.json(result);
  } catch (err) {
    console.log(err);
    return res.json({ error: "SELECT 오류" });
  }
});

export default router;
