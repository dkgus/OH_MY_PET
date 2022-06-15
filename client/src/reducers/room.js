/* eslint-disable import/no-anonymous-default-export */
import {
  RESERVATION_SUCCESS,
  RESERVE_ERROR,
  RESERVATION_UPDATE,
} from "../actions/types";

const initialState = {
  reservationInfo: null,
  reservationInfoAll: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case RESERVATION_SUCCESS:
      return {
        ...state,
        reservationInfo: payload,
        loading: false,
      };
    case RESERVATION_UPDATE:
      return {
        ...state,
        hotelInfo: payload,
        loading: false,
      };
    case RESERVE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
