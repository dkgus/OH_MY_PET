/* eslint-disable import/no-anonymous-default-export */
import { GET_MY_INFO, MISS_MY_INFO } from "../actions/types";

const initialState = {
  myInfo: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case GET_MY_INFO:
      return {
        ...state,
        myInfo: payload,
        loading: false,
      };

    case MISS_MY_INFO:
      return {
        ...state,
        myInfo: null,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
