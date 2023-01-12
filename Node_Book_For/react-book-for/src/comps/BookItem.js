const BookItem = ({ data }) => {
  return (
    <div>
      <img />
      <div>
        <h2>{data.book_list[0].title}</h2>
        <p></p>
      </div>
    </div>
  );
};

export default BookItem;
