import { useBookContext } from "../context/BookContext";
import { HiX } from "react-icons/hi";

const CollectionName = () => {
  const { open, collectionModal, collectionHandler } = useBookContext();

  return (
    <div className={open.collection ? "Collection-open" : "Collection-close"}>
      <div className="bg"></div>
      <div className="all">
        <div>
          <h1>컬렉션</h1>
          <HiX onClick={collectionModal} />
        </div>
        <label htmlFor="collection">컬렉션 이름을 입력해주세요</label>
        <input id="collection" />
        <button onClick={collectionHandler}>등록</button>
      </div>
    </div>
  );
};

export default CollectionName;
