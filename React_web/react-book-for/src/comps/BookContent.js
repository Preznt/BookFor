import { useBookContext } from "../context/BookContext";
import BookItem from "./BookItem";
import "../css/Content.css";
import "../css/Collection.css";
import { useLoaderData, useLocation } from "react-router-dom";
import { useEffect } from "react";
import PageNav from "./feature/PageNav";
import CollectionInput from "./collection/CollectionInput";

export const userBookFetch = async (e) => {
  const res = await fetch("/book?pageNum=1");
  const result = await res.json();
  console.log(result);
  return result;
};

export const cItemLoader = async ({ name }) => {
  const res = await fetch(`/collection?c_name=${name}&pageNum=1`);
  const result = await res.json();
  const dataResult = result.data;
  const cItems = dataResult.map((c) => {
    return c.collection_books.book_list;
  });

  console.log(cItems);
  return { data: cItems, pageNation: result.pageNation, name: name };
};

const BookContent = () => {
  const {
    showDataList,
    setShowDataList,
    setIsbn,
    deleteHandler,
    openHandler,
    open,
    setReqDefault,
    reqDefault,
    chkCollection,
  } = useBookContext();
  const userBook = useLoaderData();

  useEffect(() => {
    setShowDataList(userBook.data);
    setIsbn([]);
  }, []);

  // 읽는 상태 카테고리별 fetch
  const stateFetch = async (st) => {
    let res = await fetch(`/book?pageNum=1&&state=${st}`);
    if (userBook.name) {
      res = await fetch(
        `/collection?c_name=${userBook.name}&pageNum=1&state=${st}`
      );
    }
    const result = await res.json();
    console.log(result);
    userBook.pageNation = result.pageNation;
    setShowDataList(result.data);
  };

  // 읽는 상태 카테고리 클릭시 css 변경
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

  return (
    <article className="Lib">
      <div className="btns">
        <button
          className="highlight set"
          onClick={async (e) => {
            const result = await userBookFetch();
            setReqDefault({ ...reqDefault, first: 1 });
            setShowDataList(result.data);
            userBook.pageNation = result.pageNation;
            highlightHandler(e);
          }}
        >
          전체보기
        </button>
        <button
          onClick={(e) => {
            stateFetch("ing");
            setReqDefault({ ...reqDefault, first: 1 });
            highlightHandler(e);
          }}
          className="highlight"
        >
          읽는 중
        </button>
        <button
          onClick={(e) => {
            stateFetch("done");
            setReqDefault({ ...reqDefault, first: 1 });
            highlightHandler(e);
          }}
          className="highlight"
        >
          읽은 책
        </button>
        <button
          onClick={(e) => {
            stateFetch("will");
            setReqDefault({ ...reqDefault, first: 1 });
            highlightHandler(e);
          }}
          className="highlight"
        >
          읽을 책
        </button>
        {/* <button className="highlight">버릴 책</button> */}
      </div>
      <div className="top-bar">
        {userBook.name ? <h1>{userBook.name}</h1> : <h1>내 서재</h1>}
        <button onClick={openHandler}>...</button>
        {open.open ? (
          <>
            <p onClick={deleteHandler}>삭제</p>
            <p onClick={chkCollection}>컬렉션 등록</p>
          </>
        ) : null}
        <select defaultValue="current">
          <option value="current">최신등록순</option>
          <option value="title">제목순</option>
        </select>
      </div>

      {showItem[0] ? (
        <div className="book">{showItem}</div>
      ) : (
        <div>아직 등록된 책이 없습니다</div>
      )}
      <CollectionInput />
      <PageNav pageInfo={userBook.pageNation} state={reqDefault.state} />
    </article>
  );
};

export default BookContent;
