import { useBookContext } from "../../context/BookContext";
import { HiX } from "react-icons/hi";
import { useRef } from "react";

const CollectionInput = () => {
  const { open, collectionModal, collectionHandler, collection } =
    useBookContext();
  const c_name = useRef();

  // console.log(c_names);
  const updateCollectionHandler = (e) => {
    const value = e.target.innerText;
    console.log(value);
  };

  return (
    <div className={open.collection ? "Collection-open" : "Collection-close"}>
      <div className="bg" onClick={collectionModal}></div>
      <div className="all">
        <div className="header">
          <h2>컬렉션 등록</h2>
        </div>
        <div className="content">
          <label htmlFor="collection">
            {collection[0]
              ? "컬렉션 이름을 선택해 주세요"
              : "컬렉션 이름을 입력해주세요"}
          </label>
          {collection[0] ? (
            collection?.map((c, index) => {
              return (
                <div key={index} onClick={updateCollectionHandler}>
                  {c.c_name}
                </div>
              );
            })
          ) : (
            <>
              <input id="collection" ref={c_name} placeholder="컬렉션 이름" />
            </>
          )}
          <button
            onClick={() => {
              collectionHandler(c_name.current.value);
            }}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionInput;
