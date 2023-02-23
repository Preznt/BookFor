import { useBookContext } from "../context/BookContext";
import axios from "axios";
import "../css/Content.css";
import { useEffect } from "react";
import { ImStarEmpty } from "react-icons/im";

const BookRegister = () => {
  const { myBook, setMyBook, file, setFile } = useBookContext();
  const formData = new FormData();
  useEffect(() => {
    setFile();
    setMyBook();
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (e.target.files) {
      setMyBook({ ...myBook, thumbnail: e.target.files[0] });
    } else {
      setMyBook({ ...myBook, [name]: value });
    }
    console.log(myBook);
  };

  const onClickHandler = async () => {
    console.log(myBook.thumbnail);
    formData.append("upload", myBook.thumbnail);
    formData.append("detail", JSON.stringify(myBook));

    await axios.post("/book/insert", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    myBook({});
  };

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
        </div>
        <div className="detail">
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
          <ImStarEmpty className="test" />
          <div>
            <label>이름 : </label>
            <input name="title" onChange={onChangeHandler} />
          </div>
          <div>
            <label>저자 : </label>
            <input name="authors" onChange={onChangeHandler} />
          </div>
          <div>
            <label>출판사: </label>
            <input name="publisher" onChange={onChangeHandler} />
          </div>
          <div>
            <label>ISBN: </label>
            <input name="isbn" onChange={onChangeHandler} />
          </div>
          <button onClick={onClickHandler}>등록하기</button>
        </div>
      </div>
    </div>
  );
};
export default BookRegister;
