import { combineReducers } from "redux";
import auth from "./auth";
import room from "./room";
import alert from "./alert";
import myPage from "./myPage";

export default combineReducers({
  auth,
  room,
  alert,
  myPage,
});
