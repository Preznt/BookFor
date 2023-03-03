import BookInput from "./BookInput";
import { BiAlignLeft } from "react-icons/bi";
import { Link } from "react-router-dom";

const BookHeader = () => {
  return (
    <header>
      <BiAlignLeft className="menu" />
      <div>
        <Link to="/">
          <h1>Book</h1>
          <h1>For</h1>
        </Link>
      </div>
      <BookInput />
      <button>회원가입</button>
      <button>로그인</button>
    </header>
  );
};

export default BookHeader;
