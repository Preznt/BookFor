import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useBookContext } from "../context/BookContext";

const BookItem = ({ data }) => {
  const nav = useNavigate();
  const { isbn, setIsbn, open, setOpen } = useBookContext();
  const check = useRef();

  const onClickHandler = () => {
    nav("/detail", { state: data });
    setOpen({ ...open, reg: false, img: false });
  };

  const deleteHandler = (e) => {
    const check = e.target;
    console.log(e.target.checked);

    if (check.checked && isbn[0]) {
      isbn[isbn?.length] = check.value;
    } else if (check.checked) {
      isbn[0] = check.value;
    } else {
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
        onClick={deleteHandler}
      />
      <div onClick={onClickHandler}>
        <img src={data.thumbnail} />
        <div>
          <p>{data.title}</p>
          <p>{data.authors}</p>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
