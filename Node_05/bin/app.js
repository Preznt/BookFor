import express from "express";
import path from "path";
import logger from "morgan";

const app = express();
app.use(logger("dev"));

// express에 포함된 미들웨어(Middleware, 중간자 도구)

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join("./public")));

// project/views 폴더를 views이름으로 세팅
app.set("views", path.join("./views"));
app.set("view engine", "ejs");

// routes
import rootRouter from "../routes/root.js";
import calcRouter from "../routes/calc.js";
import countryRouter from "../routes/country.js";

// RequestMapping 과 router 를 연결하기
app.use("/", rootRouter);
app.use("/calc", calcRouter);
app.use("/country", countryRouter);

export default app; // 변수를 export 해줘야 다른곳에서 쓸 준비가 된다
