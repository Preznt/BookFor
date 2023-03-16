import BookInput from "./BookInput";
import BookNav from "./BookNav";
import BookHeader from "./BookHeader";
import "../css/Main.css";
import { BookContextProvider } from "../context/BookContext";
import { Outlet } from "react-router-dom";

export const loader = async () => {
  const pageNum = null;
  const res = await fetch("/1");
  return res;
};

const BookMain = () => {
  return (
    <BookContextProvider>
      <div className="Main">
        <BookHeader />
        <div className="info">
          <BookNav />
          <Outlet />
        </div>
        {/* <button className="register">책 등록하기</button> */}
      </div>
    </BookContextProvider>
  );
};

export default BookMain;
