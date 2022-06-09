import axios from "axios";
import { GET_MY_INFO, MISS_MY_INFO } from "./types";

/**
 * 마이페이지 조회
 *
 */
export const getMyInfo = () => async (dispatch) => {
  try {
    const res = await axios.get("/users/mypage");

    dispatch({
      type: GET_MY_INFO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MISS_MY_INFO,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
