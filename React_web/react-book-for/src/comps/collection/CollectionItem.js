const CollectionItem = ({ name }) => {
  return (
    <div className="item">
      <h3>{name ? name : "등록된 컬렉션이 없습니다"}</h3>
    </div>
  );
};

export default CollectionItem;
