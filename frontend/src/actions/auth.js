import Axios from "axios";
import * as types from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import { getprofile } from "./profile";

//Login Action
export const login = (username, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ username, password });
  try {
    const res = await Axios.post("/api/auth", body, config);
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: types.LOGIN_FAIL,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await Axios.get("/api/auth");

    dispatch({
      type: types.USER_LOADED,
      payload: res.data,
    });
    dispatch(getprofile(res.data._id));
  } catch (err) {
    dispatch({
      type: types.AUTH_ERROR,
    });
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: types.CLEAR_PROFILE });
  dispatch({ type: types.LOGOUT });
};

// Register User
export const register = ({ username, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ username, email, password });
  try {
    const res = await Axios.post("/api/users", body, config);
    dispatch({
      type: types.REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: types.REGISTER_FAIL,
    });
  }
};
