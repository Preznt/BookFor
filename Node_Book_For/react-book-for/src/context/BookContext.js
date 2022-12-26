import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { kakaoSearch } from "../modules/kakaoBookFetch";
import { userBook } from "../data/sampleData";
import { addBook } from "../data/BookData";

const BookContext = createContext();

const useBookContext = () => {
  return useContext(BookContext);
};

const BookContextProvider = ({ children }) => {
  const [kakaoDataList, setKakaoDataList] = useState([]);
  const [dbData, setDbData] = useState(userBook);
  const [myBook, setMyBook] = useState(addBook);
  const [showDataList, setshowDataList] = useState([]);

  // const fetchAll = useCallback(async () => {
  //   try {
  //     const res = await fetch("/book");
  //     const isbns = await res.json();
  //     const result = await isbns.map((isbn) => {
  //       return getBooks(isbn.b_isbn);
  //     });

  //     console.log(result);
  //   } catch (error) {
  //     alert("서버 접속 오류");
  //   }
  // });

  // useEffect(() => {
  //   (async () => {
  //     await fetchAll();
  //   })();
  // });

  const bookInsert = useCallback(async (clickData) => {
    console.log(clickData);
    const fetchOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clickData),
    };

    try {
      const res = await fetch("/book/insert", fetchOption);
      const result = await res.json();
      // const result = isbns.map((isbn) => {
      //   return bookSearch(isbn.b_isbn);
      // });
      console.log(result);
    } catch (err) {
      console.log(err);
      alert("서버 연결 오류");
    }
  }, []);

  const myBookInsert = useCallback(async (myBook) => {
    console.log(myBook);
    const fetchOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myBook),
    };

    try {
      const res = await fetch("/book/my/insert", fetchOption);
      const result = await res.json();
      // const result = isbns.map((isbn) => {
      //   return bookSearch(isbn.b_isbn);
      // });
      console.log(result);
    } catch (err) {
      console.log(err);
      alert("서버 연결 오류");
    }
  }, []);

  const bookSearch = useCallback(async (search) => {
    try {
      let params = {
        query: search,
        size: 30,
        target: "title",
      };
      if (Number(search) * 1 > 0) {
        params = {
          query: search,
          target: "isbn",
        };
      }
      const result = await kakaoSearch(params);
      console.log(result.data);
      return await result.data;
    } catch (err) {
      console.log(err);
    }
  }, []);

  // const bookSearch = (search) => {
  //   return getBooks(search);
  // };

  const props = {
    bookSearch,
    kakaoDataList,
    setKakaoDataList,
    bookInsert,
    dbData,
    setDbData,
    showDataList,
    setshowDataList,
    myBook,
    setMyBook,
    myBookInsert,
  };

  return <BookContext.Provider value={props}>{children}</BookContext.Provider>;
};

export { BookContextProvider, useBookContext };
