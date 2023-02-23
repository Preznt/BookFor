import { useBookContext } from "../context/BookContext";
import BookItem from "./BookItem";
import "../css/Content.css";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";

export const userBookFetch = async () => {
  const res = await fetch("/book/all");
  const result = await res.json();
  console.log(result);
  return result;
};

const BookContent = () => {
  const { showDataList, setShowDataList, isbn } = useBookContext();
  const userBook = useLoaderData();
  useEffect(() => {
    setShowDataList(userBook);
  }, []);

  const deleteHandler = () => {
    const fetchOption = {
      method: "POST",
      body: JSON.stringify(isbn),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("/book/delete", fetchOption);
    console.log(isbn);
  };

  const showItem = showDataList.map((data, index) => {
    return <BookItem data={data} key={index} />;
  });

  return (
    <article className="Lib">
      <div className="btns">
        <button className="highlight set">전체보기</button>
        <button className="highlight">읽는 중</button>
        <button className="highlight">읽은 책</button>
        <button className="highlight">읽을 책</button>
        <button className="highlight">버릴 책</button>
      </div>
      <h1>내 서재</h1>
      <p onClick={deleteHandler}>삭제</p>
      <div className="book">{showItem}</div>
    </article>
  );
};

export default BookContent;
