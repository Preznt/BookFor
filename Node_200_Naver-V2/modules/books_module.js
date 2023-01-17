import DB from "../models/index.js";

const BOOKS = DB.models.tbl_books;
const MY_BOOKS = DB.models.tbl_mybooks;
const USERS = DB.models.tbl_users;

export const bookInput = async (book, user) => {
  // user 정보를 추가할때 오류가 발생하면 그냥 통과
  const my_book = {
    my_username: user.username,
    my_isbn: book.isbn,
    my_odate: book.odate,
    my_oprice: book.discount,
  };
  // 도서정보 저장하기
  try {
    await BOOKS.create(book);
  } catch (err) {
    console.log("Book create", err);
    try {
      // insert 가 실패하면 update 를 다시한번 시도하기
      await BOOKS.update(book, { where: { isbn: book.isbn } });
    } catch (e) {
      console.log("Book update", e);
      //   return res.send("도서정보 저장 오류 발생");
      // exception 이 발생하면 exception 상위(호출한) 모듈로 전가하기, 전달하기, 던지기
      // exception 을 직접 처리하지 않고 상위 모듈로 전달하기
      throw new Error("도서 정보 저장 오류!");
    }
    // return res.send("도서정보 추가 오류");
  }

  // 내(user) 도서 정보 저장하기
  try {
    await MY_BOOKS.create(my_book);
  } catch (err) {
    console.log("MyBook, Create", err);
    try {
      await MY_BOOKS.update(my_book, {
        // Op.AND 속성대신에 Where{조건1, 조건2...}을
        // 부여하면 조건1 and 조건2 and ... 조건이 성립한다
        where: {
          // [Op.and]: [
          //   { my_isbn: my_book.my_isbn },
          //   { my_username: my_book.my_username },
          // ],
          my_isbn: my_book.my_isbn,
          my_username: my_book.my_username,
        },
      });
    } catch (e) {
      console.log("MyBook, Update", e);
      //   return res.send("내 도서정보 추가 오류");
      throw new Error("내 도서(MyBook) 정보 추가 오류");
    }
  }
};

export default { bookInput };
