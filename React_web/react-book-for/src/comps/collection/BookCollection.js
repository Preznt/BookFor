import { useLoaderData } from "react-router-dom";
import CollectionItem from "./CollectionItem";
import "../../css/Collection.css";

export const loader = async () => {
  const res = await fetch("/book/collection");
  const result = await res.json();
  console.log(result);
  return result;
};

const BookCollection = () => {
  const cNames = useLoaderData();

  const collections = cNames.map((c, index) => {
    return <CollectionItem key={index} name={c} />;
  });

  return (
    <div className="Collection">
      <h2>나의 컬렉션</h2>
      {cNames[0] ? (
        <div className="Collections">{collections}</div>
      ) : (
        <h3>등록된 컬렉션이 없습니다</h3>
      )}
    </div>
  );
};
export default BookCollection;
