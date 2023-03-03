import "../css/Main.css";
import { useBookContext } from "../context/BookContext";

const SearchItem = (props) => {
  const { myBookInsert } = useBookContext();
  const { kkData } = props;

  const onClickHandler = async (e) => {
    // const btn = e.target;
    // let isbn = btn.dataset.id;
    // if (isbn.length > 15) {
    //   isbn = isbn.substr(11, 13);
    // }
    // await setDbData({
    //   ...dbData,
    //   my_isbn: isbn,
    // });
    // await setMyBook({
    //   ...myBook,
    //   isbn: isbn,
    //   title: btn.closest("DIV").dataset.kk,
    //   thumbnail: kkData.thumbnail,
    //   authors: kkData.authors[0],
    //   publisher: kkData.publisher,
    // });
    // console.log(myBook);
  };

  return (
    <div className="searchdata">
      <img src={kkData.thumbnail} />
      <div className="detail" data-kk={kkData.title}>
        <div className="title">제목 : {kkData.title}</div>
        <div>저자 : {kkData.authors}</div>
        <div>출판사 : {kkData.publisher}</div>
        <button
          data-id={kkData.isbn}
          onClick={() => {
            myBookInsert(kkData);
          }}
        >
          추가
        </button>
      </div>
    </div>
  );
};

export default SearchItem;
