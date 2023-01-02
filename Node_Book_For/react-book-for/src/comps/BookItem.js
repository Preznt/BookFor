const BookItem = (props) => {
  const { book } = props;
  return (
    <div>
      <img />
      <div>
        <h2>제목 : {book.title}</h2>
        <p>저자 : {book.authors}</p>
      </div>
    </div>
  );
};

export default BookItem;
