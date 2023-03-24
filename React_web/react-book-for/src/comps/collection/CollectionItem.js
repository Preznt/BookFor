import { useNavigate } from "react-router-dom";
import { useBookContext } from "../../context/BookContext";

const CollectionItem = (props) => {
  const { code, name } = props;
  const { setDeleteCollection, deleteCollection, collection, setCollection } =
    useBookContext();
  const nav = useNavigate();

  const onClickHandler = (e) => {
    if (deleteCollection.delete) {
      const target = e.target;
      const selectCollection = target.id;
      const tagName = target.tagName;
      if (tagName === "H3") {
        if (target.parentNode.className == "item") {
          target.parentNode.className = "delete-item";
        } else {
          target.parentNode.className = "item";
        }
      } else {
        if (target.className == "item") {
          target.className = "delete-item";
        } else {
          target.className = "item";
        }
      }
      if (target.parentNode.className == "item" || target.className == "item") {
        setCollection([...collection, selectCollection]);
      } else {
        const filterCollection = collection.filter((c) => {
          return c !== selectCollection;
        });
        setCollection(filterCollection);
      }

      console.log(collection);
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
