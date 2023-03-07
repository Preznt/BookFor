import {
  RxArrowLeft,
  RxArrowRight,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
} from "react-icons/rx";
import { useBookContext } from "../context/BookContext";

const PageNav = (props) => {
  const { pageInfo } = props;
  const { setShowDataList } = useBookContext();
  console.log(pageInfo);

  const pageNation = (pageInfo) => {
    let num = [];

    for (let i = pageInfo.defaultPage; i < pageInfo.defaultPage + 5; i++) {
      num.push(
        <div
          onClick={async () => {
            const res = await fetch(`/book?pageNum=${i}`);
            const result = await res.json();
            console.log(result.data);
            setShowDataList(result.data);
          }}
        >
          {i}
        </div>
      );
    }
    return num;
  };

  const pages = pageNation(pageInfo);

  return (
    <div>
      <RxDoubleArrowLeft
        onClick={async () => {
          await fetch(`/book?pageNum=0}`);
        }}
      />
      <RxArrowLeft />
      {pages}
      <RxArrowRight
        onClick={async () => {
          const res = await fetch(
            `/book?pageNum=${pageInfo.defaultPage + 5}&&?reqDefault=${
              pageInfo.defaultPage + 5
            }`
          );
          const result = await res.json();
          console.log(result.data);
          setShowDataList(result.data);
        }}
      />
      <RxDoubleArrowRight
        onClick={async () => {
          await fetch(`/book?pageNum=${pageInfo.totalPage}`);
        }}
      />
    </div>
  );
};

export default PageNav;
