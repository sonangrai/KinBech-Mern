import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import ads from "./ads";
import profile from "./profile";
import category from "./category";

export default combineReducers({
  auth,
  alert,
  ads,
  profile,
  category,
});
