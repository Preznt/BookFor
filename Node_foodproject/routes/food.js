import express from "express";
import mysql from "../modules/mysqlDB.js";

const router = express.Router();

router.get("/insert", (req, res) => {
  res.render("fd_main", { body: "insert" });
});

export default router;
