import { combineReducers } from "redux";
import auth from "./auth";
import room from "./room";
import alert from "./alert";
import myPage from "./myPage";
import event from "./event";
import community from "./community";

export default combineReducers({
  auth,
  room,
  alert,
  myPage,
  event,
  community,
});
