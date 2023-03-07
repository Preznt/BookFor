import { useEffect, useState } from "react";
import {
  RxArrowLeft,
  RxArrowRight,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
} from "react-icons/rx";

const PageNav = (props) => {
  const { userBook } = props;

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
    <div>
      <RxDoubleArrowLeft onClick={pageFetch} style={{ cursor: "pointer" }} />
      <RxArrowLeft />
      <div>{completePage}</div>
      <RxArrowRight onClick={pageOnClick} style={{ cursor: "pointer" }} />
      <RxDoubleArrowRight />
    </div>
  );
};

export default PageNav;
