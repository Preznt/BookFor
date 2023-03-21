import { useNavigate } from "react-router-dom";

const CollectionItem = ({ name }) => {
  const nav = useNavigate();
  return (
    <div
      className="item"
      onClick={() => {
        nav(`/collection/${name}`);
      }}
    >
      <h3>{name}</h3>
    </div>
  );
};

export default CollectionItem;
