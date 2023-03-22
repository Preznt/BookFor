import { useBookContext } from "../context/BookContext";
import BookItem from "./BookItem";
import "../css/Content.css";
import "../css/Collection.css";
import { useLoaderData, useLocation } from "react-router-dom";
import { useEffect } from "react";
import PageNav from "./feature/PageNav";
import CollectionInput from "./collection/CollectionInput";
import { FiMenu } from "react-icons/fi";
import { HiXMark } from "react-icons/hi2";

export const cItemLoader = async (code) => {
  console.log(code);
  const res = await fetch(`/collection?c_code=${code}&pageNum=1`);
  const result = await res.json();
  const dataResult = result.data;
  const cItems = dataResult.map((c) => {
    return c.collection_books.book_list;
  });
  console.log(dataResult);
  return {
    data: cItems,
    pageNation: result.pageNation,
    name: dataResult[0].c_name,
    c_code: code,
  };
};

export const userBookFetch = async (code) => {
  if (code == "") {
    let res = await fetch("/book?pageNum=1");
    const result = await res.json();
    console.log(result);
    return result;
  } else {
    return cItemLoader(code);
  }
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
    updateCollection,
    setCollection,
  } = useBookContext();
  const userBook = useLoaderData();

  useEffect(() => {
    setShowDataList(userBook.data);
    setIsbn([]);
  }, [userBook.data]);

  // 읽는 상태 카테고리별 fetch
  const stateFetch = async (st) => {
    let res = await fetch(`/book?pageNum=1&&state=${st}`);
    let result = await res.json();
    if (userBook.name) {
      res = await fetch(
        `/collection?c_code=${userBook.c_code}&pageNum=1&state=${st}`
      );
      result = await res.json();
      const stateItems = result.data.map((s) => {
        return s.collection_books.book_list;
      });
      setShowDataList(stateItems);
      // console.log(stateItems);
    } else {
      setShowDataList(result.data);
    }

    userBook.pageNation = result.pageNation;
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
            const result = await userBookFetch(
              userBook.c_code ? userBook.c_code : ""
            );
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
        <button onClick={openHandler}>
          {open.open ? <HiXMark /> : <FiMenu />}
        </button>
        {open.open ? (
          <>
            <p
              onClick={() => {
                deleteHandler(userBook.c_code);
              }}
            >
              삭제
            </p>
            {userBook.c_code ? (
              ""
            ) : (
              <>
                <p
                  onClick={() => {
                    setCollection("");
                    chkCollection();
                  }}
                >
                  컬렉션 등록
                </p>
                <p
                  onClick={async () => {
                    setCollection(await updateCollection());
                  }}
                >
                  컬렉션 추가
                </p>
              </>
            )}
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
        <div className="book">아직 등록된 책이 없습니다</div>
      )}
      <CollectionInput />
      <PageNav pageInfo={userBook.pageNation} state={reqDefault.state} />
    </article>
  );
};

export default BookContent;
