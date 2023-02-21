const BookItem = ({ data }) => {
  return (
    <div className="item">
      <img src={data["book_list.thumbnail"]} />
      <div className="detail">
        <p>{data["book_list.title"]}</p>
        <p>{data["book_list.authors"]}</p>
      </div>
    </div>
  );
};

export default BookItem;
