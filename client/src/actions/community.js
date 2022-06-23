import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POST,
  GET_POSTS,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  POST_ERROR,
} from "./types";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/community/list");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getOnlyOnePost =
  ({ id, postId }) =>
  async (dispatch) => {
    try {
      const res = await axios.get(`/community/list/${id}/${postId}`);
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

export const createPost =
  ({ formData, navigate }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(formData);
    try {
      const res = await axios.post("/community/new_post", body, config);
      dispatch({
        type: CREATE_POST,
        payload: res.data,
      });
      dispatch(setAlert("글이 작성되었습니다. :)", "success"));
      navigate("/community/list");
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

export const deletePost =
  ({ id, postId, navigate }) =>
  async (dispatch) => {
    try {
      await axios.delete(`/community/delete/${id}/${postId}`);
      dispatch(setAlert("글이 삭제되었습니다. :)", "success"));
      navigate("/community/list");
    } catch (err) {
      const errors = err.response.data.msg;
      if (errors) {
        dispatch(setAlert(errors, "danger"));
      }
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
