import { useLoaderData } from "react-router-dom";
import CollectionItem from "./CollectionItem";
import "../../css/Collection.css";
import { MdCollectionsBookmark } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { HiXMark } from "react-icons/hi2";
import { useBookContext } from "../../context/BookContext";

export const loader = async () => {
  const res = await fetch("/collection/select");
  const result = await res.json();
  console.log(result);
  return result;
};

const BookCollection = () => {
  const cNames = useLoaderData();
  const { setOpen, open } = useBookContext();
  const collections = cNames.map((c, index) => {
    return <CollectionItem key={index} code={c.c_code} name={c.c_name} />;
  });
  const deleteOpen = () => {
    setOpen({ ...open, collection_delete: !open.collection_delete });
  };

  return (
    <div className="Collection">
      <div className="top-title">
        <h2 className="title">
          <MdCollectionsBookmark />
          나의 컬렉션
        </h2>
        <div className="option">
          <button onClick={deleteOpen}>
            {open.collection_delete ? (
              <>
                <HiXMark />
              </>
            ) : (
              <FiMenu />
            )}
          </button>
          {open.collection_delete ? <span>삭제</span> : ""}
        </div>
      </div>
      {cNames[0] ? (
        <div className="Collections">{collections}</div>
      ) : (
        <h3>등록된 컬렉션이 없습니다</h3>
      )}
    </div>
  );
};
export default BookCollection;
