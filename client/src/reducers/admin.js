/* eslint-disable import/no-anonymous-default-export */
import {
  GET_ALL_USER,
  GET_ALL_EVENT,
  GET_ALL_ROOM,
  ADMIN_GET_ERR,
} from "../actions/types";

const initialState = {
  users: [],
  reservationInfo: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_USER:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case GET_ALL_EVENT:
    case GET_ALL_ROOM:
      return {
        ...state,
        reservationInfo: payload,
        loading: false,
      };
    case ADMIN_GET_ERR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
