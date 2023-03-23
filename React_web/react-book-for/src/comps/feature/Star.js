import { useBookContext } from "../../context/BookContext";
import { useRef } from "react";

const Star = (props) => {
  const { myDetail, setMyDetail } = useBookContext();
  const { star, reg } = props;
  const filledStar = useRef();

  // 별점 구현
  const starHandler = (e, filledStar) => {
    // console.log(filledStar.current);
    filledStar.current.style.width = `${e.target.value * 10}%`;
    setMyDetail({ ...myDetail, my_star: e.target.value });
  };

  return (
    <div className="Star">
      <div className="blank-star">
        ☆☆☆☆☆
        <span ref={filledStar} style={{ width: `${star * 10}%` }}>
          ★★★★★
        </span>
        <input
          name="my_star"
          type="range"
          min="0"
          max="10"
          disabled={reg ? null : "disabled"}
          onChange={(e) => {
            starHandler(e, filledStar);
          }}
        />
      </div>
    </div>
  );
};

export default Star;
