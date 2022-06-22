import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POST,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  POST_ERROR,
} from "./types";

export const getPost = () => async (dispatch) => {
  try {
    const res = await axios.get("/community/list");
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
