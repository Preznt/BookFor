import SearchInput from "./SearchInput";
import { BiAlignLeft } from "react-icons/bi";
import { FaUserGraduate } from "react-icons/fa";

import { Link } from "react-router-dom";

const BookHeader = () => {
  return (
    <div className="Header">
      <header>
        <BiAlignLeft className="menu" />
        <div>
          <Link to="/">
            <h1>Book</h1>
            <h1>For</h1>
          </Link>
        </div>
        <SearchInput />
        <button className="join">회원가입</button>
        <button className="login">로그인</button>
      </header>
    </div>
  );
};

export default BookHeader;
