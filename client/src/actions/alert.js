import { ALERT_SUCCESS, ALERT_REMOVE } from "./types";
import { v4 as uuid } from "uuid";

export const setAlert =
  (msg, alertType, timeout = 5000) =>
  (dispatch) => {
    const id = uuid();
    dispatch({
      type: ALERT_SUCCESS,
      payload: { msg, alertType, id },
    });

    setTimeout(() => dispatch({ type: ALERT_REMOVE, payload: id }), timeout);
  };
