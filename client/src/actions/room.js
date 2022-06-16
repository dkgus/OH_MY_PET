import axios from "axios";
import { setAlert } from "./alert";
import {
  RESERVATION_SUCCESS,
  RESERVE_ERROR,
  RESERVATION_UPDATE,
} from "./types";

export const reserveRoom =
  ({ hotelName, roomType, revStart, revEnd, navigate }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ hotelName, roomType, revStart, revEnd });
    try {
      const res = await axios.post("/room/new", body, config);
      dispatch({
        type: RESERVATION_SUCCESS,
        payload: res.data,
      });
      dispatch(setAlert("예약이 완료되었습니다 :)", "success"));
      navigate("/room_reservation");
    } catch (err) {
      dispatch({
        type: RESERVE_ERROR,
      });
    }
  };

export const updateRoom =
  ({ id, editIndex, formData, navigate }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ formData });

    try {
      const res = await axios.put(`/room/${id}/${editIndex}`, body, config);

      dispatch({
        type: RESERVATION_UPDATE,
        payload: res.data,
      });
      dispatch(setAlert("예약이 수정되었습니다 :)", "success"));
      navigate(`/my_page/${id}`);
    } catch (err) {
      dispatch({
        type: RESERVE_ERROR,
      });
    }
  };