import { Link } from "react-router-dom";
import { useBookContext } from "../context/BookContext";

const BookNav = () => {
  const { setOpen, open } = useBookContext();
  const regHandler = () => {
    setOpen({ ...open, reg: true, input: true });
    console.log(open);
  };
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
          <Link to="/register" onClick={regHandler}>
            등록하기
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default BookNav;
