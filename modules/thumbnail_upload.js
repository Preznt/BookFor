// 책 등록하기 화면의 thumbnail을 업로드 하기 위한 모듈

import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 } from "uuid";

const thumbnail_dir = path.join("react-book-for/public/uploads");

const storageOption = {
  filename: (req, file, cb) => {
    const uuidPrefix = v4();
    console.log(file.originalname);
    const newFileName = Buffer.from(
      `${uuidPrefix}-${file.originalname}`,
      "latin1"
    ).toString("utf8");
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    const uploadFileName = newFileName.substring(newFileName.length - 255);
    cb(null, uploadFileName);
  },
  destination: (req, file, cb) => {
    if (!fs.existsSync(thumbnail_dir)) {
      fs.mkdirSync(thumbnail_dir, { recursive: true });
    }
    cb(null, thumbnail_dir);
  },
};

const storage = multer.diskStorage(storageOption);
export default multer({ storage });
