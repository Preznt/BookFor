import { Link } from "react-router-dom";

const BookNav = () => {
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
          <Link to={`/detail`} state={{ reg: true }}>
            등록하기
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default BookNav;
