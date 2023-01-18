import DB from "../models/index.js";
import { book_error } from "../config/error_code.js";

const BOOKS = DB.models.tbl_books;
const MY_BOOKS = DB.models.tbl_mybooks;

export const bookInput = async (book, user) => {
  // user 정보를 추가할때 오류가 발생하면 그냥 통과
  const my_book = {
    my_username: user?.username, // 로그인 정보가 없으면 null 값
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

      /**
       * 2023-01-17 변경사항
       * Error exception 을 발생할때 단순 문자열을 전달하지 않고
       * JSON 객체 type 의 데이터 전달하기
       * 이때 JSON 객체 type 은 Stringify(변환)하여 전달한다
       * Error() 클래스는 문자열만 전달 할 수 있기 때문에
       */
      throw new Error(JSON.stringify(book_error.BOOK_INSERT_ERROR));
    }
    // return res.send("도서정보 추가 오류");
  }

  // 혹시 로그인 정보가 누락되어 사용자 정보가 없으면
  // my_books 정보를 저장하지 않도록 하기
  if (!user?.username) return false;

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
      throw new Error(JSON.stringify(book_error.MY_BOOK_INSERT_ERROR));
    }
  }
};

export const getMyBooks = async (user) => {
  const username = user.username;
  console.log("getMyBooks", user);
  let myBooks = null;
  try {
    myBooks = await MY_BOOKS.findAll({
      where: { my_username: username },
      include: "my_isbn_tbl_book",
    });
  } catch (e) {
    console.log(e);
    throw new Error("MyBook Select 오류");
  }

  // return myBooks;
  const myBooksInfo = myBooks.map((book) => {
    return book.my_isbn_tbl_book;
  });
  return myBooksInfo;
};

export default { bookInput, getMyBooks };
