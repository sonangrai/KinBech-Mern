import Axios from "axios";
import * as types from "./types";
import { setAlert } from "./alert";

//get profile
export const getprofile = (id) => async (dispatch) => {
  try {
    const res = await Axios.get(`/api/profile/${id}`);
    dispatch({
      type: types.PROFILE_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.PROFILE_LOAD_FAIL,
      payload: { msg: "Error loading Profile", status: err.response.status },
    });
  }
};

//edit profile
export const editprofile = (id, data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  var sdata = JSON.stringify(data);
  try {
    const res = Axios.put(`/api/profile/${id}`, sdata, config);
    console.log(res);
    dispatch({
      type: types.PROFILE_UPDATED,
      payload: res.data,
    });
    dispatch(getprofile(id));
    dispatch(setAlert("Profile Updated", "success"));
  } catch (err) {
    dispatch({
      type: types.PROFILE_UPDATED_FAIL,
      payload: { msg: "Error Update", status: err.response.status },
    });
  }
};
