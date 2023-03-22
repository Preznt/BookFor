import { useNavigate } from "react-router-dom";

const CollectionItem = (props) => {
  const { code, name } = props;
  const nav = useNavigate();
  return (
    <div
      className="item"
      onClick={() => {
        nav(`/collection/${code}`);
      }}
    >
      <h3>{name}</h3>
    </div>
  );
};

export default CollectionItem;
