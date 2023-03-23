import { useNavigate } from "react-router-dom";
import { useBookContext } from "../../context/BookContext";

const CollectionItem = (props) => {
  const { code, name } = props;
  const { setDeleteCollection, deleteCollection, collection, setCollection } =
    useBookContext();
  const nav = useNavigate();

  const onClickHandler = (e) => {
    if (deleteCollection.delete) {
      const selectCollection = e.target.id;

      const filterCollection = collection.filter((c) => {
        return c !== selectCollection;
      });
      setCollection(filterCollection);
      console.log(collection);
      // await fetch(`/collection/delete/${collection}`, {
      //   method: "DELETE",
      // });
    } else {
      nav(`/collection/${code}`);
    }
  };
  return (
    <div
      className={deleteCollection.delete ? "delete-item" : "item"}
      id={code}
      onClick={onClickHandler}
    >
      <h3 id={code}>{name}</h3>
    </div>
  );
};

export default CollectionItem;
