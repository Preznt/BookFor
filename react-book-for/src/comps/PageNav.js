import { useEffect, useState } from "react";
import {
  RxArrowLeft,
  RxArrowRight,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
} from "react-icons/rx";
import { useBookContext } from "../context/BookContext";

const PageNav = (props) => {
  const { pageInfo } = props;
  const { setShowDataList, reqDefault, setReqDefault } = useBookContext();
  console.log(pageInfo);
  useEffect(() => {
    setReqDefault(pageInfo.defaultPage);
  }, []);

  const pageNation = () => {
    let num = [];
    let mod = pageInfo.totalPage % 5;
    const result = parseInt(pageInfo.totalPage / 5);
    console.log(mod, result);
    let chPage = reqDefault + mod;

    if (reqDefault < result * 5) chPage = reqDefault + 5;

    for (let i = reqDefault; i < chPage; i++) {
      num.push(
        <div
          key={i}
          onClick={async () => {
            const res = await fetch(`/book?pageNum=${i}`);
            const result = await res.json();
            console.log(result.data);
            setShowDataList(result.data);
          }}
        >
          {i}
        </div>
      );
    }
    return num;
  };

  const pages = pageNation(pageInfo);

  return (
    <div className="PageNation">
      <RxDoubleArrowLeft
        onClick={async () => {
          const res = await fetch(`/book?pageNum=1`);
          const result = await res.json();
          setReqDefault(1);
          setShowDataList(result.data);
        }}
      />
      <RxArrowLeft
        onClick={async () => {
          const res = await fetch(
            `/book?pageNum=${reqDefault - 5}&&?reqDefault=${reqDefault - 5}`
          );
          const result = await res.json();
          console.log(result.data);
          setReqDefault(reqDefault - 5);
          setShowDataList(result.data);
        }}
      />
      <div className="pages">{pages}</div>
      <RxArrowRight
        onClick={async () => {
          const res = await fetch(
            `/book?pageNum=${reqDefault + 5}&&?reqDefault=${reqDefault + 5}`
          );
          const result = await res.json();
          console.log(result.data);
          setReqDefault(reqDefault + 5);
          setShowDataList(result.data);
        }}
      />
      <RxDoubleArrowRight
        onClick={async () => {
          const res = await fetch(`/book?pageNum=${pageInfo.totalPage}`);
          const result = await res.json();
          const mod = pageInfo.totalPage % 5;
          setReqDefault(pageInfo.totalPage - mod + 1);
          setShowDataList(result.data);
        }}
      />
    </div>
  );
};

export default PageNav;
