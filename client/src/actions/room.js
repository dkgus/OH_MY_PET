import axios from "axios";
import { RESERVATION_SUCCESS, RESERVE_ERROR } from "./types";

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
      navigate("/room_reservation");
    } catch (err) {
      dispatch({
        type: RESERVE_ERROR,
      });
    }
  };
