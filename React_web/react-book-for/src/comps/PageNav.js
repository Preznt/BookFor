import { cloneElement, useEffect, useState } from "react";
import {
  RxArrowLeft,
  RxArrowRight,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
} from "react-icons/rx";
import { useBookContext } from "../context/BookContext";

const PageNav = (props) => {
  const { pageInfo, state } = props;
  const { setShowDataList, reqDefault, setReqDefault } = useBookContext();
  console.log(pageInfo);
  useEffect(() => {
    setReqDefault({ ...reqDefault, first: pageInfo.defaultPage });
  }, []);

  const pageNation = () => {
    console.log(reqDefault.first);
    let num = [];
    let mod = pageInfo.totalPage % 5;
    const result = parseInt(pageInfo.totalPage / 5);
    // console.log(mod, result);
    let chPage = reqDefault.first + mod;

    if (reqDefault.first < result * 5) chPage = reqDefault.first + 5;
    console.log(reqDefault.first);
    for (let i = reqDefault.first; i < chPage; i++) {
      num.push(
        <div
          key={i}
          onClick={async () => {
            const res = await fetch(`/book?pageNum=${i}`);
            const result = await res.json();
            // console.log(result.data);
            setReqDefault({ ...reqDefault, dbRight: false });
            setShowDataList(result.data);
          }}
          // 첫 페이지나 다음 페이지 이동시 첫번째 버튼 css 활성화
          className={i == reqDefault.first ? "active pageNum" : "pageNum"}
        >
          {i}
        </div>
      );
    }
    // 맨 뒤로 가는 방향키를 클릭했을때 css 적용을 위한 조건
    if (reqDefault.dbRight === true) {
      const num0 = cloneElement(num[0], { className: "" });
      const lastNum = cloneElement(num[num.length - 1], {
        className: "active",
      });
      num.splice(0, 1, num0);
      num.splice(num.length - 1, 1, lastNum);
      console.log(num);
    }
    console.log(num);
    return num;
  };

  /**
   * 이벤트 버블링을 이용해서 해당 태그의 부모태그를 찾고
   * 그 하위 자식태그들의 클래스 이름을
   * 없애주고 클릭된 태그만 active로 설정해주기
   *
   * 3/12 맨앞으로 가기 css 오류 수정
   */

  const btnCss = (e) => {
    const parent = e.target?.parentElement;
    let childs = parent.childNodes;
    if (e.target.className === "pageNum") {
      for (let i = 0; i < childs.length; i++) {
        childs[i].className = "";
      }
      e.target.className = "active";
    } else if (e.target.id === "db-left") {
      const divs = childs[2].childNodes;
      for (let i = 0; i < divs.length; i++) {
        childs[2].childNodes[i].className = "";
      }
      console.log();
      childs[2].childNodes[0].className = "active";
    }

    console.log(e.target.id);
  };

  const pages = pageNation();

  return (
    <div className="PageNation" onClick={btnCss}>
      <RxDoubleArrowLeft
        id="db-left"
        onClick={async () => {
          const res = await fetch(`/book?pageNum=1`);
          const result = await res.json();
          setReqDefault({ ...reqDefault, first: 1, dbRight: false });
          setShowDataList(result.data);
        }}
      />
      <RxArrowLeft
        onClick={async () => {
          if (reqDefault.first - 5 < 1) {
            alert("잘못된 접근입니다");
          } else {
            const res = await fetch(
              `/book?pageNum=${reqDefault.first - 5}&&reqDefault=${
                reqDefault.first - 5
              }`
            );
            const result = await res.json();
            console.log(result.data);
            setReqDefault({
              ...reqDefault,
              first: reqDefault.first - 5,
              dbRight: false,
            });
            setShowDataList(result.data);
          }
        }}
      />
      <div className="pages">{pages}</div>
      <RxArrowRight
        onClick={async () => {
          console.log(state);
          const res = await fetch(
            `/book?pageNum=${reqDefault.first + 5}&&state=${state}`
          );
          const result = await res.json();
          console.log(result.data);
          setReqDefault({
            ...reqDefault,
            first: reqDefault.first + 5,
            dbRight: false,
          });
          setShowDataList(result.data);
        }}
      />
      <RxDoubleArrowRight
        onClick={async () => {
          const res = await fetch(`/book?pageNum=${pageInfo.totalPage}`);
          const result = await res.json();
          const mod = pageInfo.totalPage % 5;
          setReqDefault({
            ...reqDefault,
            first:
              mod === 0 ? pageInfo.totalPage - 4 : pageInfo.totalPage - mod + 1,
            dbRight: true,
          });
          setShowDataList(result.data);
        }}
      />
    </div>
  );
};

export default PageNav;
