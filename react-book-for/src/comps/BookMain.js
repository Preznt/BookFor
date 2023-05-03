import BookNav from "./BookNav";
import BookHeader from "./header/BookHeader";
import "../css/Main.css";
import { Outlet } from "react-router-dom";

export const loader = async () => {
  const res = await fetch("/1");
  return res;
};

const BookMain = () => {
  return (
    <div className="Main">
      <BookHeader />
      <div className="info">
        <BookNav />
        <Outlet />
      </div>
      {/* <button className="register">책 등록하기</button> */}
    </div>
  );
};

export default BookMain;
