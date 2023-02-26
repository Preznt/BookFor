import { useLocation } from "react-router-dom";
import { useBookContext } from "../context/BookContext";
import axios from "axios";
import { HiArrowUpRight } from "react-icons/hi2";
import "../css/Detail.css";
import Star from "./Star";
import { useEffect } from "react";
import { regBookData } from "../data/sampleData";

const BookDetail = () => {
  const location = useLocation();
  const bookData = location.state;
  console.log(bookData);

  const {
    myBook,
    setMyBook,
    file,
    setFile,
    myDetail,
    setMyDetail,
    open,
    inputHandler,
  } = useBookContext();
  const formData = new FormData();

  useEffect(() => {
    setFile();
    setMyBook(bookData);
    if (bookData.reg) {
      setMyBook(regBookData);
      console.log(myBook);
    }
  }, [bookData]);
  // console.log(myBook);
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

  const onUpdateHandler = (e) => {
    setMyBook();
    inputHandler();
  };

  return (
    <div className="detail">
      {bookData ? null : <h2>책 등록하기</h2>}
      <div className="book">
        <div className="img">
          <img
          // src={bookData ? bookData[`${B}.thumbnail`] : file ? file : null}
          />
          {bookData ? null : (
            <div>
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
          )}
        </div>
        <div className="word">
          <div className="top-title">
            <div>
              {bookData.test ? <label>*이름</label> : null}
              <input
                name="title"
                // readOnly={open.input ? null : "readOnly"}
                value={myBook.title}
                onChange={onChangeHandler}
              />
            </div>
            <select onChange={onChangeHandler} defaultValue={myBook.my_state}>
              <option value="ing">읽는 중</option>
              <option value="done">읽음</option>
              <option value="will">읽을</option>
              <option value="no">없음</option>
            </select>
          </div>
          <Star star={bookData?.my_star} />
          <div>
            {bookData ? null : <label>*저자</label>}
            <input
              name="authors"
              value={myBook.authors}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            {bookData ? null : <label>*출판사</label>}
            <input
              name="publisher"
              value={myBook.publisher}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            {bookData ? null : <label>*isbn</label>}
            <input name="isbn" value={myBook.isbn} onChange={onChangeHandler} />
          </div>

          {bookData ? (
            <a href={bookData.url}>
              자세히 보기
              <HiArrowUpRight className="arrow" />
            </a>
          ) : null}
        </div>
      </div>
      <div className="mydetail">
        <div>인상깊은 구절</div>
        <div className="date">
          <div>
            <label>구매한 날짜</label>
            {bookData?.my_buy_date ? (
              <p>{bookData?.my_buy_date.substr(0, 10)}</p>
            ) : null}
            {bookData ? null : (
              <input
                name="my_buy_date"
                type="date"
                onChange={onChangeHandler}
              />
            )}
          </div>
          <div>
            <label>읽기 시작한 날짜</label>
            {bookData?.my_start_date ? (
              <p>{bookData?.my_start_date.substr(0, 10)}</p>
            ) : null}
            {bookData ? null : (
              <input
                name="my_start_date"
                type="date"
                onChange={onChangeHandler}
              />
            )}
          </div>
          <div>
            <label>다 읽은 날짜</label>
            {bookData?.my_done_date ? (
              <p>{bookData?.my_done_date.substr(0, 10)}</p>
            ) : null}
            {bookData ? null : (
              <input
                name="my_done_date"
                type="date"
                onChange={onChangeHandler}
              />
            )}
          </div>
          <div>
            <label>등록된 날짜 </label>

            {bookData?.my_reg_date ? (
              <p>{bookData?.my_reg_date.substr(0, 10)}</p>
            ) : null}
            {bookData ? null : (
              <input
                name="my_reg_date"
                type="date"
                onChange={onChangeHandler}
              />
            )}
          </div>
        </div>
      </div>
      {bookData ? (
        <button
          onClick={() => {
            onUpdateHandler();
            inputHandler();
          }}
          className="submit"
        >
          수정하기
        </button>
      ) : (
        <button onClick={onClickHandler} className="submit">
          등록하기
        </button>
      )}
    </div>
  );
};

export default BookDetail;
