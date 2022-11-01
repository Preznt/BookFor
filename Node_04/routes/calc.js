import express from "express";
const router = express.Router();

router.get("/:num1/:num2", (req, res) => {
  let { num1, num2 } = req.params;
  //   console.log(typeof num1);
  res.send(`${num1} + ${num2} = ${Number(num1) + Number(num2)}`);
});

export default router;
