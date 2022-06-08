/* eslint-disable import/no-anonymous-default-export */
import { ALERT_SUCCESS, ALERT_REMOVE } from "../actions/types";

const initialState = [];
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ALERT_SUCCESS:
      return [...state, payload];
    case ALERT_REMOVE:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
