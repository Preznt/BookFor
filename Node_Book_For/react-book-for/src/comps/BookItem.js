const BookItem = ({ data }) => {
  return (
    <div>
      <img src={data["book_list.thumbnail"]} />
      <div>
        <p>{data["book_list.title"]}</p>
        <p>{data["book_list.author"]}</p>
      </div>
    </div>
  );
};

export default BookItem;
