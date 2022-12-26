import { CiSearch } from "react-icons/ci";
import SearchItem from "./SearchItem";
import { useBookContext } from "../context/BookContext";
import { useCallback } from "react";

const BookInput = () => {
  const { bookSearch, kakaoDataList, setKakaoDataList } = useBookContext();

  const onChangeHandler = useCallback(
    async (e) => {
      // const keyCode = e.keyCode;
      const value = e.target.value;
      // if (keyCode === 13) {
      if (value) {
        const result = await bookSearch(value);
        const arrResult = await result.documents;
        // console.log(arrResult);
        setKakaoDataList([...arrResult]);
        console.log(kakaoDataList);
        // }
      } else {
        setKakaoDataList([]);
      }
    },
    [kakaoDataList, setKakaoDataList]
  );

  const searchListView = kakaoDataList.map((kkData) => {
    return <SearchItem kkData={kkData} key={kkData.isbn} />;
  });

  return (
    <div className="inputbox">
      <input placeholder="도서 이름 입력" onChange={onChangeHandler} />
      <CiSearch className="search" />
      <div className={searchListView.length > 0 ? "searchbox" : "close"}>
        {searchListView}
      </div>
    </div>
  );
};

export default BookInput;
