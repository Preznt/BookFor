import { useBookContext } from "../context/BookContext";
import axios from "axios";
import "../css/Content.css";
import { useEffect } from "react";
import Star from "./Star";

const BookRegister = () => {
  const { myBook, setMyBook, file, setFile, myDetail, setMyDetail } =
    useBookContext();
  const formData = new FormData();

  // 다시 들어왔을 때 값을 초기화 해주기 위한 훅
  useEffect(() => {
    setFile();
    setMyBook();
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    const type = e.target.type;
    if (e.target.files) {
      setMyBook({ ...myBook, thumbnail: e.target.files[0] });
    } else if (type === "date") {
      setMyDetail({ ...myDetail, [name]: value });
    } else if (type === "select-one") {
      setMyDetail({ ...myDetail, my_state: value });
    } else {
      setMyBook({ ...myBook, [name]: value });
    }
    console.log(myBook);
    console.log(myDetail);
  };

  const onClickHandler = async () => {
    console.log(myBook.thumbnail);
    formData.append("upload", myBook.thumbnail);
    formData.append("detail", JSON.stringify(myBook));
    formData.append("myDetail", JSON.stringify(myDetail));

    await axios.post("/book/insert", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    myBook({});
  };

  // 첨부파일 미리보기 구현
  const readImage = (e) => {
    const imgFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onloadend = () => {
      setFile(reader.result);
      console.log(file);
    };
  };

  return (
    <div className="Reg">
      <h2>책 등록하기</h2>
      <div className="content">
        <div className="img">
          <img src={file ? file : null} />
          <div>
            <label>표지 :</label>
            <input
              name="thumbnail"
              type="file"
              accept="image/*"
              onChange={(e) => {
                onChangeHandler(e);
                readImage(e);
              }}
            />
          </div>
        </div>
        <div className="detail">
          <Star />
          <label>*상태 : </label>
          <select onChange={onChangeHandler} defaultValue="no">
            <option value="ing">읽는 중</option>
            <option value="done">읽음</option>
            <option value="will">읽을</option>
            <option value="no">없음</option>
          </select>
          <div>
            <label>*이름 : </label>
            <input name="title" onChange={onChangeHandler} />
          </div>
          <div>
            <label>*저자 : </label>
            <input name="authors" onChange={onChangeHandler} />
          </div>
          <div>
            <label>*출판사: </label>
            <input name="publisher" onChange={onChangeHandler} />
          </div>
          <div>
            <label>*ISBN: </label>
            <input name="isbn" onChange={onChangeHandler} />
          </div>
          <div>
            <label>인상깊은 구절</label>
          </div>
          <div>
            <label>산 날짜</label>
            <input type="date" name="my_buy_date" onChange={onChangeHandler} />
          </div>
          <div>
            <label>읽기 시작한 날짜</label>
            <input
              type="date"
              name="my_start_date"
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <label>다 읽은 날짜</label>
            <input type="date" name="my_done_date" onChange={onChangeHandler} />
          </div>
          <button onClick={onClickHandler}>등록하기</button>
        </div>
      </div>
    </div>
  );
};
export default BookRegister;
