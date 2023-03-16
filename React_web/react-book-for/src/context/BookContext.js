import { createContext, useContext, useState, useCallback } from "react";
import { kakaoSearch } from "../modules/kakaoBookFetch";
import { userBook } from "../data/sampleData";
import { addBook } from "../data/BookData";

const BookContext = createContext();

const useBookContext = () => {
  return useContext(BookContext);
};

const BookContextProvider = ({ children }) => {
  const [kakaoDataList, setKakaoDataList] = useState([]);
  const [myBook, setMyBook] = useState(addBook);
  const [myDetail, setMyDetail] = useState({});
  const [file, setFile] = useState({});
  const [search, setSearch] = useState("");
  const [isbn, setIsbn] = useState([]);
  const [open, setOpen] = useState({
    open: false,
    img: false,
    reg: false,
  });
  // const [myBookList, setMyBookList] = useState([]);
  const [showDataList, setShowDataList] = useState([]);
  const [reqDefault, setReqDefault] = useState({
    first: 0,
    dbRight: false,
    state: null,
  });

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
      // console.log(result);
    } catch (err) {
      console.log(err);
      alert("서버 연결 오류");
    }
  }, []);

  const myBookInsert = useCallback(
    async (myBook) => {
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

        // console.log(result);
        if (result === "OVERLAP_ISBN") {
          alert("이미 추가된 도서입니다");
        } else {
          setShowDataList(result);
        }
      } catch (err) {
        console.log(err);
        alert("서버 연결 오류");
      }
    },
    [setShowDataList]
  );

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

  const deleteHandler = async () => {
    const fetchOption = {
      method: "POST",
      body: JSON.stringify(isbn),
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (window.confirm("정말 삭제하시겠습니까?")) {
      window.location.replace("/");
      await fetch("/book/delete", fetchOption);
    } else {
      return false;
    }

    // const result = await res.json();
    // console.log(result);

    // setShowDataList(result);
  };

  const openHandler = () => {
    setOpen({ ...open, open: !open.open });
  };

  const regHandler = () => {
    setOpen({ ...open, reg: true });
    console.log(open);
  };
  const imgHandler = () => {
    setOpen({ ...open, img: true });
  };

  const regImgHandler = () => {
    setOpen({ ...open, reg: true, img: true });
    console.log(open);
  };
  const props = {
    bookSearch,
    kakaoDataList,
    setKakaoDataList,
    bookInsert,
    showDataList,
    setShowDataList,
    myBook,
    setMyBook,
    myBookInsert,
    search,
    setSearch,
    file,
    setFile,
    myDetail,
    setMyDetail,
    isbn,
    setIsbn,
    deleteHandler,
    open,
    setOpen,
    openHandler,
    regHandler,
    imgHandler,
    regImgHandler,
    reqDefault,
    setReqDefault,
  };

  return <BookContext.Provider value={props}>{children}</BookContext.Provider>;
};

export { BookContextProvider, useBookContext };
