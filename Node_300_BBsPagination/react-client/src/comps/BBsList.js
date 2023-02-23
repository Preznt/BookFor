import { Link, useLoaderData } from "react-router-dom";
import BBsSearch from "./BBsSearch";
import PageNav from "./PageNav";

export const loader = async ({ params, values }) => {
  console.log(values.orderValue, values.filterValue);
  console.log(params);
  const pageNum = params?.pageNum || 1;
  const listLimit = 5;
  const pageNavCount = 5;

  // JSON type 의 객체를 queryString 객체로 변환
  const apiParams = new URLSearchParams({
    pageNum,
    order: values.orderValue.eng,
    filter: values.filterValue.eng,
    listLimit,
    pageNavCount,
  });

  const strParams = apiParams.toString();

  const res = await fetch(`/api?${strParams}`);
  const { bbsList, pageNation } = await res.json();
  return { bbsList, pageNation };
};

const bbsListView = (bbsList) => {
  return bbsList.map((bbs) => {
    return (
      <tr>
        <td>{bbs.b_seq}</td>
        <td>{bbs.b_date}</td>
        <td>{bbs.b_time}</td>
        <td>
          {bbs.b_nickname}({bbs.b_username})
        </td>
        <td>
          <Link to={`/bbs/detail/${bbs.b_seq}`}>{bbs.b_subject}</Link>
        </td>
        <td>{bbs.b_count}</td>
      </tr>
    );
  });
};

const BBsList = () => {
  const { bbsList } = useLoaderData();
  const listResult = bbsListView(bbsList);
  return (
    <>
      <table className="bbs list">
        <thead>
          <tr>
            <th>SEQ</th>
            <th>작성일자</th>
            <th>작성시각</th>
            <th>작성자</th>
            <th>제목</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>{listResult}</tbody>
      </table>
      <BBsSearch />
      <PageNav />
    </>
  );
};

export default BBsList;
