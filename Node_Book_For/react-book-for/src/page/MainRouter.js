import { createBrowserRouter } from "react-router-dom";
// 지금 BookMain 이 export default 로 되어있는데 아래와 같이 하면 찾아진다
// import { BookMain } from "../comps";
import {
  BookMain,
  BookContent,
  BookRegister,
  BookCollection,
  BookDetail,
} from "../comps";
import { userBookFetch } from "../comps/BookContent";

const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <BookMain />,
    children: [
      { path: "", loader: userBookFetch, element: <BookContent /> },
      { path: "/register", element: <BookDetail /> },
      { path: "/collection", element: <BookCollection /> },
      { path: "/detail", element: <BookDetail /> },
    ],
  },
]);
export default MainRouter;
