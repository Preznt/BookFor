import { REST_API_Key } from "../config/kakaoSecret";
import axios from "axios";

const Kakao = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: `KakaoAK ${REST_API_Key}`,
  },
});

const kakaoSearch = (params) => {
  return Kakao.get("/v3/search/book", { params });
};
// const kakao_Book_JSON_URL = "/search/book";
// const getQueryData = async (query) => {
//   const queryString = `${kakao_Book_JSON_URL}?target=${encodeURIComponent(
//     query
//   )}`;
//   const kakaoFetchOption = {
//     method: "GET",
//   };
//   const res = await fetch(queryString, kakaoFetchOption);
//   const result = await res.json();

//   return result;
// };

export { kakaoSearch };
