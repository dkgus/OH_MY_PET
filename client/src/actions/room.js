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
  ({ id, pageIndex }) =>
  async (dispatch) => {
    //console.log("id11", id);
    //onsole.log("pageIndex", pageIndex);
    try {
      //const res = await axios.put(`/room/${id}/${pageIndex}`);
      //console.log("Res.", res.data);

      dispatch({
        type: RESERVATION_UPDATE,
        //payload: res.data,
      });
      dispatch(setAlert("예약이 수정되었습니다 :)", "success"));
    } catch (err) {
      dispatch({
        type: RESERVE_ERROR,
      });
    }
  };
