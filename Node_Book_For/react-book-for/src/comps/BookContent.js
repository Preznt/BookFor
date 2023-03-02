import { useBookContext } from "../context/BookContext";
import BookItem from "./BookItem";
import {
  RxArrowLeft,
  RxArrowRight,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
} from "react-icons/rx";
import "../css/Content.css";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

export const userBookFetch = async (e) => {
  const res = await fetch("/book/all");
  const result = await res.json();
  console.log(result);
  return result;
};

const BookContent = () => {
  const {
    showDataList,
    setShowDataList,
    setIsbn,
    deleteHandler,
    openHandler,
    open,
  } = useBookContext();
  const userBook = useLoaderData();

  useEffect(() => {
    setShowDataList(userBook.firstPage);
    setIsbn([]);
  }, []);

  const stateFetch = async (st) => {
    const res = await fetch(`/book/state/${st}`);
    const result = await res.json();
    console.log(result);
    setShowDataList(result);
  };

  const highlightHandler = (e) => {
    const parent = e.target?.parentElement;
    const childs = parent.childNodes;
    for (let i = 0; i < childs.length; i++) {
      childs[i].className = "highlight";
    }
    e.target.className = "highlight set";
  };

  const showItem = showDataList.map((data, index) => {
    return <BookItem data={data} key={index} />;
  });

  // 페이지 네이션
  const [completePage, setCompletePage] = useState([]);
  const showPage = 5;
  let pages = [];
  useEffect(() => {
    const totalPage = userBook.pageNation.totalPage;
    const quotient = parseInt(totalPage % showPage);
    const remainder = totalPage % showPage;
    console.log(remainder);

    if (remainder === 0 || quotient !== 0) {
      for (let i = 0; i < showPage; i++) {
        pages.push(<button data-id={i + 1}>{i + 1}</button>);
      }
    } else {
      for (let i = 0; i < remainder; i++) {
        pages.push(<button data-id={i + 1}>{i + 1}</button>);
      }
    }

    setCompletePage(pages);
  }, []);

  let nextPages = [];
  const pageOnClick = (e) => {
    const totalPage = userBook.pageNation.totalPage;
    const parent = e.target.parentElement;
    const btnDiv = parent?.childNodes[2];
    const btns = btnDiv?.childNodes;
    const startPage = btns[0]?.innerText;
    const endPage = btns[btns?.length - 1]?.innerText;
    console.log(startPage, endPage);

    if (totalPage % showPage === 0) {
      for (let i = startPage + showPage; i === i + showPage; i++) {
        nextPages.push(<button>{i + 1}</button>);
        console.log(pages);
      }
    } else {
      for (
        let i = startPage + showPage;
        i === i + (totalPage % showPage);
        i++
      ) {
        nextPages.push(<button>{i}</button>);
        console.log(pages);
      }
    }
    setCompletePage(nextPages);
  };

  const pageFetch = async () => {
    const page = 5;
    const res = await fetch(`/${page}`);
  };

  return (
    <article className="Lib">
      <div className="btns">
        <button
          className="highlight set"
          onClick={async (e) => {
            const result = await userBookFetch();
            setShowDataList(result.firstPage);
            highlightHandler(e);
          }}
        >
          전체보기
        </button>
        <button
          onClick={(e) => {
            stateFetch("ing");
            highlightHandler(e);
          }}
          className="highlight"
        >
          읽는 중
        </button>
        <button
          onClick={(e) => {
            stateFetch("done");
            highlightHandler(e);
          }}
          className="highlight"
        >
          읽은 책
        </button>
        <button
          onClick={(e) => {
            stateFetch("will");
            highlightHandler(e);
          }}
          className="highlight"
        >
          읽을 책
        </button>
        {/* <button className="highlight">버릴 책</button> */}
      </div>
      <div className="top-bar">
        <h1>내 서재</h1>
        <button onClick={openHandler}>...</button>
        {open.open ? <p onClick={deleteHandler}>삭제</p> : null}
        <select defaultValue="current">
          <option value="current">최신등록순</option>
          <option value="title">제목순</option>
        </select>
      </div>

      <div className="book">{showItem}</div>
      <div>
        <RxDoubleArrowLeft onClick={pageFetch} style={{ cursor: "pointer" }} />
        <RxArrowLeft />
        <div>{completePage}</div>
        <RxArrowRight onClick={pageOnClick} style={{ cursor: "pointer" }} />
        <RxDoubleArrowRight />
      </div>
    </article>
  );
};

export default BookContent;
