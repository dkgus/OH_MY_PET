/* eslint-disable import/no-anonymous-default-export */
import {
  GET_POST,
  GET_POSTS,
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
    case CREATE_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        post: state.filter((postOne) => postOne._id !== payload),
        //post: null,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
