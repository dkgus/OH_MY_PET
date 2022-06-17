import axios from "axios";
import { setAlert } from "./alert";
import { RESERVATION_EVENT_SUCCESS, RESERVATION_EVENT_FAIL } from "./types";

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
