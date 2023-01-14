const BookItem = ({ data }) => {
  return (
    <div>
      <img src={data.thumbnail} />
      <div>
        <h2>{data.title}</h2>
        <p>{data.authors}</p>
      </div>
    </div>
  );
};

export default BookItem;
