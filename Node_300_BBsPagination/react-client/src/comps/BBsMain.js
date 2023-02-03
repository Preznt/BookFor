import BBsList from "./BBsList";
import "../css/BBs.css";
import PageNav from "./PageNav";

export const loader = async ({ params }) => {
  const pageNum = params?.pageNum || 1;
  const listLimit = 5;
  const pageNavCount = 5;

  const res = await fetch(
    `/api?pageNum=${pageNum}&listLimit=${listLimit}&pageNavCount=${pageNavCount}`
  );
  const { bbsList, pageNation } = await res.json();
  return { bbsList, pageNation };
};

const BBsMain = () => {
  return (
    <>
      <BBsList />
      <PageNav />
    </>
  );
};

export default BBsMain;
