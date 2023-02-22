import { useNavigate } from "react-router-dom";

const BookItem = ({ data }) => {
  const nav = useNavigate();
  const onClickHandler = () => {
    nav("/detail", { state: data });
  };

  return (
    <div className="item" onClick={onClickHandler}>
      <img src={data["book_list.thumbnail"]} />
      <div>
        <p>{data["book_list.title"]}</p>
        <p>{data["book_list.authors"]}</p>
      </div>
    </div>
  );
};

export default BookItem;
