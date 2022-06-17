import axios from "axios";
import {
  GET_MY_INFO,
  MISS_MY_INFO,
  GET_EVENT_INFO,
  FAIL_EVENT_INFO,
} from "./types";

/**
 * 마이페이지 조회
 *
 */
export const getMyInfo = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/users/mypage/${id}`);
    const eventRes = await axios.get("/event/getInfo");

    dispatch({
      type: GET_MY_INFO,
      payload: res.data,
    });
    dispatch({
      type: GET_EVENT_INFO,
      payload: eventRes.data,
    });
  } catch (err) {
    dispatch({
      type: MISS_MY_INFO,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
