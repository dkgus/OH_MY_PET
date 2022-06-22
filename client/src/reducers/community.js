/* eslint-disable import/no-anonymous-default-export */
import {
  GET_POST,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  POST_ERROR,
} from "../actions/types";

const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POST:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    default:
      return state;
  }
}
