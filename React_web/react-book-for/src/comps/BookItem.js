import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { MdOutlineImageSearch } from "react-icons/md";
import { useBookContext } from "../context/BookContext";

const BookItem = ({ data }) => {
  const nav = useNavigate();
  const { isbn, setIsbn, open, setOpen } = useBookContext();
  const check = useRef();

  const onClickHandler = async () => {
    const res = await fetch(`/book/detail/${data.isbn}`);
    const result = await res.json();
    console.log(result);
    nav("/detail", { state: result[0] });
    setOpen({ ...open, reg: false, img: false });
  };

  const deleteChkHandler = (e) => {
    const check = e.target;
    console.log(e.target.checked);

    if (check.checked && isbn[0]) {
      // 두개 이상 체크했을 때
      isbn[isbn?.length] = check.value;
    } else if (check.checked) {
      // 처음 체크됐을 떄
      isbn[0] = check.value;
    } else {
      // 체크 해제할 경우
      // isbn[0] = "test";
      const filterIsbn = isbn.filter((is) => {
        return is !== check.value;
      });

      setIsbn(filterIsbn);
    }

    console.log(isbn);
  };

  return (
    <div className="item">
      <input
        className={open.open ? "open" : "close"}
        type="checkbox"
        ref={check}
        value={data.isbn}
        onClick={deleteChkHandler}
      />
      <div onClick={onClickHandler}>
        {data.thumbnail ? (
          <img src={data.thumbnail} />
        ) : (
          <MdOutlineImageSearch />
        )}
        <div>
          <p className="title">{data.title}</p>
          <p>{data.authors}</p>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
