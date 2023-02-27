import { Link } from "react-router-dom";
import { useBookContext } from "../context/BookContext";

const BookNav = () => {
  const { regImgHandler } = useBookContext();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">내 서재</Link>
        </li>
        <li>
          <Link to="/collection">컬렉션</Link>
        </li>
        <li>
          <Link to="/register" onClick={regImgHandler}>
            등록하기
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default BookNav;
