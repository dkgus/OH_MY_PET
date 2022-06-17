/* eslint-disable import/no-anonymous-default-export */
import {
  RESERVATION_EVENT_SUCCESS,
  RESERVATION_EVENT_FAIL,
  GET_EVENT_INFO,
  FAIL_EVENT_INFO,
  EVENT_UPDATE,
  EVENT_ERROR,
} from "../actions/types";

const initialState = {
  reservationEventInfo: null, //화면 출력용
  reservationEventInfoAll: [],
  reservationList: [], //데이터 가져오기용
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
    case EVENT_UPDATE:
      return {
        ...state,
        reservationList: payload,
        loading: false,
      };

    case EVENT_ERROR:
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
