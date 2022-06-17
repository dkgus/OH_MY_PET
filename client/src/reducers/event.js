/* eslint-disable import/no-anonymous-default-export */
import {
  RESERVATION_EVENT_SUCCESS,
  RESERVATION_EVENT_FAIL,
  GET_EVENT_INFO,
  FAIL_EVENT_INFO,
} from "../actions/types";

const initialState = {
  reservationEventInfo: null,
  reservationEventInfoAll: [],
  reservationList: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case RESERVATION_EVENT_SUCCESS:
      return {
        ...state,
        reservationEventInfo: payload,
        loading: false,
      };
    case GET_EVENT_INFO:
      return {
        ...state,
        reservationList: payload,
        loading: false,
      };
    case RESERVATION_EVENT_FAIL:
    case FAIL_EVENT_INFO:
      return {
        ...state,
        reservationEventInfo: payload,
        loading: false,
      };

    default:
      return state;
  }
}
