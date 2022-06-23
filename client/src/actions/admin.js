import axios from "axios";
import {
  GET_ALL_USER,
  GET_ALL_EVENT,
  GET_ALL_ROOM,
  ADMIN_GET_ERR,
} from "./types";

export const getAllUsersInfo = () => async (dispatch) => {
  try {
    const res = await axios.get("/admin/usersInfo");
    dispatch({
      type: GET_ALL_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADMIN_GET_ERR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getAllEventInfo = () => async (dispatch) => {
  try {
    const res = await axios.get("/admin/eventInfo");
    dispatch({
      type: GET_ALL_EVENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADMIN_GET_ERR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getAllRoomInfo = () => async (dispatch) => {
  try {
    const res = await axios.get("/admin/roomInfo");
    dispatch({
      type: GET_ALL_ROOM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADMIN_GET_ERR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
