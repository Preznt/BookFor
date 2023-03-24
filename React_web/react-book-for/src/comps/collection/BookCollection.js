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
  const { setDeleteCollection, deleteCollection, collection } =
    useBookContext();
  const collections = cNames.map((c, index) => {
    return <CollectionItem key={index} code={c.c_code} name={c.c_name} />;
  });
  const deleteOpen = () => {
    setDeleteCollection({
      ...deleteCollection,
      delete: !deleteCollection.delete,
    });
  };

  const deleteHandler = async () => {
    const fetchOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(collection),
    };

    if (!collection[0]) {
      alert("삭제 할 컬렉션을 선택해 주세요");
    } else if (window.confirm("정말 삭제하시겠습니까?")) {
      const res = await fetch(`/collection/delete/`, fetchOption);
      const result = await res.json();
      if (result.delete) {
        alert("삭제가 완료되었습니다");
      } else {
        alert("삭제에 실패했습니다");
      }
      window.location.reload("/collection");
    }
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
            {deleteCollection.delete ? (
              <>
                <HiXMark />
              </>
            ) : (
              <FiMenu />
            )}
          </button>
          {deleteCollection.delete ? (
            <span onClick={deleteHandler}>삭제</span>
          ) : (
            ""
          )}
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
