import { createBrowserRouter } from "react-router-dom";
// 지금 BookMain 이 export default 로 되어있는데 아래와 같이 하면 찾아진다
// import { BookMain } from "../comps";
import { BookMain, BookContent, BookCollection, BookDetail } from "../comps";
import { loader as mainLoader } from "../comps/BookMain";
import { loader as collectionLoader } from "../comps/collection/BookCollection";
import { userBookFetch, cItemLoader } from "../comps/BookContent";

const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <BookMain />,
    children: [
      {
        path: "",
        loader: () => {
          return userBookFetch("");
        },
        element: <BookContent />,
      },
      { path: "/update", element: <BookDetail /> },
      { path: "/register", element: <BookDetail /> },
      {
        path: "/collection",
        loader: collectionLoader,
        element: <BookCollection />,
      },
      {
        path: "/collection/:code",
        loader: ({ params }) => {
          return cItemLoader(params.code);
        },
        element: <BookContent />,
      },
      { path: "/detail", element: <BookDetail /> },
    ],
  },
]);
export default MainRouter;
