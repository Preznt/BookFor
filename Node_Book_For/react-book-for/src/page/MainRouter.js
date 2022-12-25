import { Routes, Route } from "react-router-dom";
// 지금 BookMain 이 export default 로 되어있는데 아래와 같이 하면 찾아진다
// import { BookMain } from "../comps";
import { BookMain, BookContent, BookRegister } from "../comps";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<BookMain />}>
        <Route index element={<BookContent />}></Route>
        <Route path="/register" element={<BookRegister />}></Route>
      </Route>
    </Routes>
  );
};
export default MainRouter;
