import "../css/Content.css";

const BookRegister = () => {
  return (
    <div className="Reg">
      <h2>책 등록하기</h2>
      <div className="content">
        <div className="img">
          <img />
        </div>
        <div className="detail">
          <div>
            <label>표지 :</label>
            <input name="b_thumbnail" type="file" />
          </div>
          <div>
            <label>이름 : </label>
            <input name="b_title" />
          </div>
          <div>
            <label>저자 : </label>
            <input name="b_author" />
          </div>
          <div>
            <label>출판사: </label>
            <input name="b_publisher" />
          </div>
          <div>
            <label>ISBN: </label>
            <input name="b_isbn" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookRegister;
