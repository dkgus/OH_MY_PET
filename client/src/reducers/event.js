/* eslint-disable import/no-anonymous-default-export */
import {
  RESERVATION_EVENT_SUCCESS,
  RESERVATION_EVENT_FAIL,
} from "../actions/event";

const initialState = {
  reservationEventInfo: null,
  reservationEventInfoAll: [],
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
    case RESERVATION_EVENT_FAIL:
      return {
        ...state,
        reservationEventInfo: payload,
        loading: false,
      };
    default:
      return state;
  }
}
