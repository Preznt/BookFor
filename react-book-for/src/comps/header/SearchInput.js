import { CiSearch } from "react-icons/ci";
import SearchItem from "./SearchItem";
import { useBookContext } from "../../context/BookContext";
import { useCallback } from "react";

const SearchInput = () => {
  const { bookSearch, kakaoDataList, setKakaoDataList } = useBookContext();
  let clientX;

  const onChangeHandler = useCallback(
    async (e) => {
      // const keyCode = e.keyCode;
      const value = e.target.value;
      console.log(value);
      // if (keyCode === 13) {
      if (value) {
        const result = await bookSearch(value);
        const arrResult = await result.documents;
        // console.log(arrResult);
        setKakaoDataList([...arrResult]);
        console.log(kakaoDataList);
      } else {
        setKakaoDataList([]);
      }
    },
    [kakaoDataList, setKakaoDataList]
  );

  const searchListView = kakaoDataList.map((kkData, index) => {
    return <SearchItem kkData={kkData} key={index} />;
  });

  return (
    <div className="inputbox">
      <input
        placeholder="도서 이름이나 ISBN을 입력해주세요"
        onKeyUp={onChangeHandler}
      />
      <CiSearch className="search" />
      <div
        onClick={(e) => {
          console.log(e.clientX);
        }}
        className={searchListView.length > 0 ? "searchbox" : "close"}
      >
        {searchListView}
      </div>
    </div>
  );
};

export default SearchInput;
