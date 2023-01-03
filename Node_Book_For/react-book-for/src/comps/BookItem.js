const BookItem = ({ data }) => {
  return (
    <div>
      <img />
      <div>
        <h2>{data.title}</h2>
        <p>{data.authors}</p>
      </div>
    </div>
  );
};

export default BookItem;
