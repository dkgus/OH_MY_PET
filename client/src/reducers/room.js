import { RESERVATION_SUCCESS, RESERVE_ERROR } from "../actions/types";

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
