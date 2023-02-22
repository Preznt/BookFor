import { useLocation } from "react-router-dom";
import { HiArrowUpRight } from "react-icons/hi2";
import "../css/Detail.css";

const BookDetail = () => {
  const location = useLocation();
  const bookData = location.state;

  return (
    <div className="detail">
      <div className="book">
        <img src={bookData["book_list.thumbnail"]} />
        <div className="word">
          <h1>{bookData["book_list.title"]}</h1>
          <p>{bookData["book_list.authors"]}</p>
          <select>
            <option>읽는 중</option>
            <option>읽음</option>
            <option>읽을</option>
          </select>
          <a href={bookData["book_list.url"]}>
            자세히 보기
            <HiArrowUpRight className="arrow" />
          </a>
        </div>
      </div>
      <div className="mydetail"></div>
    </div>
  );
};

export default BookDetail;
