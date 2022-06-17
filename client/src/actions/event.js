import axios from "axios";
import { setAlert } from "./alert";
import {
  RESERVATION_EVENT_SUCCESS,
  RESERVATION_EVENT_FAIL,
  GET_EVENT_INFO,
  FAIL_EVENT_INFO,
} from "./types";

export const reserveEvent =
  ({ formData, navigate }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(formData);
    console.log("body", body);
    try {
      const res = await axios.post("/event/new", body, config);

      dispatch({
        type: RESERVATION_EVENT_SUCCESS,
        payload: res.data,
      });
      console.log("Res", res);
      dispatch(setAlert("이벤트 신청이 완료 되었습니다 :)", "success"));
      navigate("/event_reservation");
    } catch (err) {
      dispatch({
        type: RESERVATION_EVENT_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

export const getReserveEventInfo = () => async (dispatch) => {
  try {
    const res = await axios.get("/event/getInfo");
    dispatch({
      type: GET_EVENT_INFO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FAIL_EVENT_INFO,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
