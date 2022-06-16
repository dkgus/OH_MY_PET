import axios from "axios";
import setTokenToLocal from "../utils/setTokenToLocal";
import { setAlert } from "./alert";

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from "./types";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setTokenToLocal(localStorage.token);
  }
  try {
    const res = await axios.get("/users/login");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post("/users/login", body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
