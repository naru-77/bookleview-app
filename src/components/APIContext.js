import { createContext, useContext } from "react";

const API_BASE_URL =
  "https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com";
const APIContext = createContext(API_BASE_URL);

export const useAPI = () => {
  return useContext(APIContext);
};
