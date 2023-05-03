import "../../css/Main.css";
import { useBookContext } from "../../context/BookContext";

const SearchItem = (props) => {
  const { myBookInsert } = useBookContext();
  const { kkData } = props;

  return (
    <div className="searchdata">
      <img src={kkData.thumbnail} />
      <div className="detail">
        <div className="title">제목 : {kkData.title}</div>
        <div>저자 : {kkData.authors}</div>
        <div>출판사 : {kkData.publisher}</div>
        <div className="btn">
          <button
            onClick={() => {
              myBookInsert(kkData);
            }}
          >
            추가
          </button>
          <a href={kkData.url}>자세히 보기</a>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
