import { combineReducers } from "redux";
import auth from "./auth";
import room from "./room";
import alert from "./alert";

export default combineReducers({
  auth,
  room,
  alert,
});
