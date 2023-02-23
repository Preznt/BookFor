import { useNavigate } from "react-router-dom";
import { useBookContext } from "../context/BookContext";

const BookItem = ({ data }) => {
  const nav = useNavigate();
  const { isbn, setIsbn } = useBookContext();

  const onClickHandler = () => {
    nav("/detail", { state: data });
  };

  const deleteHandler = (e) => {
    const check = e.target;
    console.log(e.target.checked);

    if (check.checked && isbn[isbn.length - 1]) {
      isbn[isbn.length] = check.value;
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
        type="checkbox"
        value={data["book_list.isbn"]}
        onClick={deleteHandler}
      />
      <div onClick={onClickHandler}>
        <img src={data["book_list.thumbnail"]} />
        <div>
          <p>{data["book_list.title"]}</p>
          <p>{data["book_list.authors"]}</p>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
