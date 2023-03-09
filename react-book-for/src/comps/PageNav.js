import { cloneElement, useEffect, useState } from "react";
import {
  RxArrowLeft,
  RxArrowRight,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
} from "react-icons/rx";
import { useBookContext } from "../context/BookContext";

const PageNav = (props) => {
  const { pageInfo } = props;
  const { setShowDataList, reqDefault, setReqDefault, num, setNum } =
    useBookContext();
  console.log(pageInfo);
  useEffect(() => {
    setReqDefault({ ...reqDefault, first: pageInfo.defaultPage });
  }, []);

  const pageNation = () => {
    let num = [];
    let mod = pageInfo.totalPage % 5;
    const result = parseInt(pageInfo.totalPage / 5);
    console.log(mod, result);
    let chPage = reqDefault.first + mod;

    if (reqDefault.first < result * 5) chPage = reqDefault.first + 5;

    for (let i = reqDefault.first; i < chPage; i++) {
      num.push(
        <div
          key={i}
          onClick={async () => {
            const res = await fetch(`/book?pageNum=${i}`);
            const result = await res.json();
            console.log(result.data);
            setShowDataList(result.data);
          }}
          className={i == reqDefault.first ? "active" : ""}
        >
          {i}
        </div>
      );
    }

    if (reqDefault.dbRight === true) {
      const num0 = cloneElement(num[0], { className: "active" });
      console.log(num0);
      // num[0].props.className = "";
      // num[num.length - 1].props.className = "active";
      // reqDefault.dbRight = false;
    }
    return num;
  };

  /**
   * 이벤트 버블링을 이용해서 해당 태그의 부모태그를 찾고
   * 그 하위 자식태그들의 클래스 이름을
   * 없애주고 클릭된 태그만 active로 설정해주기
   */

  const btnCss = (e) => {
    const parent = e.target?.parentElement;
    let childs = parent.childNodes;
    if (e.target.tagName === "DIV") {
      for (let i = 0; i < childs.length; i++) {
        childs[i].className = "";
      }
      e.target.className = "active";
    }
    // else {
    //   childs = childs[2].childNodes;
    //   for (let i = 0; i < childs.length; i++) {
    //     childs[i].className = "";
    //   }
    //   childs[childs.length - 1].className = "active";
    // }

    console.log(e.target.id);
  };

  const pages = pageNation();

  return (
    <div className="PageNation" onClick={btnCss}>
      <RxDoubleArrowLeft
        onClick={async () => {
          const res = await fetch(`/book?pageNum=1`);
          const result = await res.json();
          setReqDefault({ ...reqDefault, first: 1 });
          setShowDataList(result.data);
        }}
      />
      <RxArrowLeft
        onClick={async () => {
          const res = await fetch(
            `/book?pageNum=${reqDefault.first - 5}&&?reqDefault=${
              reqDefault.first - 5
            }`
          );
          const result = await res.json();
          console.log(result.data);
          setReqDefault({ ...reqDefault, first: reqDefault.first - 5 });
          setShowDataList(result.data);
        }}
      />
      <div className="pages">{pages}</div>
      <RxArrowRight
        onClick={async () => {
          const res = await fetch(
            `/book?pageNum=${reqDefault.first + 5}&&?reqDefault=${
              reqDefault.first + 5
            }`
          );
          const result = await res.json();
          console.log(result.data);
          setReqDefault({ ...reqDefault, first: reqDefault.first + 5 });
          setShowDataList(result.data);
        }}
      />
      <RxDoubleArrowRight
        // id="db-right"
        onClick={async () => {
          const res = await fetch(`/book?pageNum=${pageInfo.totalPage}`);
          const result = await res.json();
          const mod = pageInfo.totalPage % 5;
          setReqDefault({
            ...reqDefault,
            first: pageInfo.totalPage - mod + 1,
            dbRight: true,
          });
          setShowDataList(result.data);
        }}
      />
    </div>
  );
};

export default PageNav;
