import { useState } from "react";
import { useBBSContext } from "../context/BBsContext";

const BBsSearch = () => {
  const {
    orderList,
    filterList,
    orderValue,
    filterValue,
    setOrderValue,
    setFilterValue,
    searchInput,
    setSearchInput,
  } = useBBSContext();

  const [inputText, setInputText] = useState();
  const onChangeHandler = (e) => {
    setInputText(e.target.value);
  };

  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      setSearchInput(inputText);
    }
  };

  return (
    <div className="bbs search-box">
      <select
        className="w3-select w3-border w3-round-xlarge"
        value={orderValue.eng}
        onChange={(e) => {
          const t = e.target; // 버블링에서 가장 하단의 tag
          const c = e.currentTarget; // 현재 tag
          setOrderValue({
            eng: t.value,
            kor: t.options[c.selectedIndex].text,
          });
        }}
      >
        {orderList.map((order) => {
          return (
            <option value={order.eng} key={order.eng}>
              {order.kor}
            </option>
          );
        })}
      </select>
      <select
        className="w3-select w3-border w3-round-xlarge"
        value={filterValue.eng}
        onChange={(e) => {
          const t = e.target; // 버블링에서 가장 하단의 tag
          const c = e.currentTarget; // 현재 tag
          setFilterValue({
            eng: t.value,
            kor: t.options[c.selectedIndex].text,
          });
        }}
      >
        {filterList.map((filter) => {
          return (
            <option value={filter.eng} key={filter.eng}>
              {filter.kor}
            </option>
          );
        })}
      </select>
      <input
        placeholder="검색어"
        className="w3-input w3-border w3-round-xlarge"
        defaultValue={searchInput}
        value={inputText}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
      ></input>
    </div>
  );
};

export default BBsSearch;
