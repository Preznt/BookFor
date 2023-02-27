import { useLocation } from "react-router-dom";
import { useBookContext } from "../context/BookContext";
import axios from "axios";
import { HiArrowUpRight } from "react-icons/hi2";
import "../css/Detail.css";
import Star from "./Star";
import { useEffect } from "react";
import { regBookData } from "../data/sampleData";

/**
 * 해당 책의 Detail을 보는 부분과 등록 화면을 BookDetail 이라는
 * 컴포넌트를 같이 사용하기 위해서
 * useLocation을 이용해 /register (등록페이지)로 갈때 "reg : true"값을
 * 같이 보내 구분하는 기준으로 사용했다
 *
 * 굳이 데이터를 보내줄 필요없이 등록하기를 클릭할때
 * state 값을 변경해주는 방식으로 이벤트를 만들어줌
 */

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
    imgHandler,
    regHandler,
  } = useBookContext();
  const formData = new FormData();

  useEffect(() => {
    setFile();
    setMyBook(bookData);
    if (open.reg) {
      setMyBook(regBookData);
      console.log(myBook);
    }
  }, [bookData]);
  // console.log(myBook);
  // 인서트할 데이터 저장
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    const type = e.target.type;
    if (e.target.files) {
      setMyBook({ ...myBook, thumbnail: e.target.files[0] });
    } else if (type === "date") {
      setMyDetail({ ...myDetail, [name]: value });
    } else if (type === "select-one") {
      console.log("SELECT-ONE");
      setMyDetail({ ...myDetail, my_state: value });
      setMyBook({ ...myBook, my_state: value });
    } else {
      console.log("ELSE");
      setMyBook({ ...myBook, [name]: value });
    }

    console.log(myDetail);
  };

  console.log(myBook);

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

  // const onUpdateHandler = (e) => {
  //   setMyBook();
  //   inputHandler();
  // };

  return (
    <div className="detail">
      {bookData ? null : <h2>책 등록하기</h2>}
      <div className="book">
        <div className="img">
          <img src={!open.img ? myBook?.thumbnail : file ? file : null} />
          {!open.reg ? null : (
            <div>
              <input
                name="thumbnail"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  onChangeHandler(e);
                  readImage(e);
                  imgHandler();
                }}
              />
            </div>
          )}
        </div>
        <div className="word">
          <div className="top-title">
            <div>
              {open.reg ? <label>*이름</label> : null}
              <input
                name="title"
                readOnly={open.reg ? null : "readOnly"}
                value={myBook?.title}
                onChange={onChangeHandler}
              />
            </div>
            <select
              onChange={onChangeHandler}
              value={myBook?.my_state}
              disabled={open.reg ? null : "disabled"}
            >
              <option value="ing">읽는 중</option>
              <option value="done">읽음</option>
              <option value="will">읽을</option>
              <option value="no">없음</option>
            </select>
          </div>
          <Star star={myBook?.my_star} reg={open.reg} />
          <div>
            {open.reg ? <label>*저자</label> : null}
            <input
              name="authors"
              readOnly={open.reg ? null : "readOnly"}
              value={myBook?.authors}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            {open.reg ? <label>*출판사</label> : null}
            <input
              name="publisher"
              readOnly={open.reg ? null : "readOnly"}
              value={myBook?.publisher}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            {open.reg ? <label>*isbn</label> : null}
            <input
              name="isbn"
              value={myBook?.isbn}
              readOnly={open.reg ? null : "readOnly"}
              onChange={onChangeHandler}
            />
          </div>

          {open.reg || !myBook?.url ? null : (
            <a href={bookData ? bookData.url : ""}>
              자세히 보기
              <HiArrowUpRight className="arrow" />
            </a>
          )}
        </div>
      </div>
      <div className="mydetail">
        <div>인상깊은 구절</div>
        <div className="date">
          <div>
            <label>구매한 날짜</label>
            {open.reg ? (
              <input
                name="my_buy_date"
                type="date"
                onChange={onChangeHandler}
              />
            ) : (
              <p>{myBook?.my_buy_date?.substr(0, 10)}</p>
            )}
          </div>
          <div>
            <label>읽기 시작한 날짜</label>
            {open?.reg ? (
              <input
                name="my_start_date"
                type="date"
                onChange={onChangeHandler}
              />
            ) : (
              <p>{bookData?.my_start_date?.substr(0, 10)}</p>
            )}
          </div>
          <div>
            <label>다 읽은 날짜</label>
            {open?.reg ? (
              <input
                name="my_done_date"
                type="date"
                onChange={onChangeHandler}
              />
            ) : (
              <p>{bookData?.my_done_date?.substr(0, 10)}</p>
            )}
          </div>
          <div>
            {open?.reg ? null : <label>등록된 날짜 </label>}

            {open?.reg ? null : <p>{bookData?.my_reg_date.substr(0, 10)}</p>}
          </div>
        </div>
      </div>
      {open.reg ? (
        <button onClick={onClickHandler} className="submit">
          등록하기
        </button>
      ) : (
        <button
          onClick={() => {
            // onUpdateHandler();
            regHandler();
          }}
          className="submit"
        >
          수정하기
        </button>
      )}
    </div>
  );
};

export default BookDetail;
