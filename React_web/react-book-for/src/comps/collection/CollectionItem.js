import { useNavigate } from "react-router-dom";
import { useBookContext } from "../../context/BookContext";

const CollectionItem = (props) => {
  const { code, name } = props;
  const { open } = useBookContext();
  const nav = useNavigate();

  const onClickHandler = async (e) => {
    if (open.collection_delete) {
      const collection = e.target.id;
      console.log(collection);
      // await fetch(`/collection/delete/${collection}`, {
      //   method: "DELETE",
      // });
    } else {
      nav(`/collection/${code}`);
    }
  };
  return (
    <div className="item" onClick={onClickHandler}>
      <h3 id={code}>{name}</h3>
    </div>
  );
};

export default CollectionItem;
