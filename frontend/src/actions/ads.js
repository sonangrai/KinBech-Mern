import Axios from "axios";
import * as types from "./types";
import { setAlert } from "./alert";

//get slider adds
export const sliderAds = () => async (dispatch) => {
  try {
    const res = await Axios.get(`/api/ads`);
    dispatch({
      type: types.GET_ADS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.ADS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get adds
export const getads = () => async (dispatch) => {
  try {
    const res = await Axios.get(`/api/ads`);
    dispatch({
      type: types.GET_ADS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.ADS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get single ad
export const singleAd = (id) => async (dispatch) => {
  try {
    const res = await Axios.get(`/api/ads/${id}`);
    dispatch({
      type: types.GET_AD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.ADS_ERROR,
      payload: { msg: "error loading", status: err.response.status },
    });
  }
};

//post adds
export const postad = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  var bodyFormData = new FormData();
  bodyFormData.append("title", data.title);
  bodyFormData.append("condition", data.condition);
  bodyFormData.append("price", data.price);
  bodyFormData.append("pricenegotiable", data.pricenegotiable);
  bodyFormData.append("fimg", data.fimg);
  bodyFormData.append("description", data.description);

  console.log(data);
  try {
    const res = await Axios.post(`/api/ads/`, bodyFormData, config);
    dispatch({
      type: types.ADS_ADDED,
      payload: res.data,
    });
    dispatch(setAlert("Your Ads is submitted for Review", "success"));
  } catch (err) {
    dispatch({
      type: types.ADS_ADDED_FAILED,
      payload: { msg: "error loading", status: err.response.status },
    });
  }
};

//approve ads
export const approveAds = (id) => async (dispatch) => {
  try {
    const res = await Axios.put(`/api/ads/approve/${id}`);
    dispatch({
      type: types.ADS_APPROVED,
      payload: res.data,
    });
    dispatch(setAlert("Ads Approved", "success"));
    dispatch(getads());
  } catch (err) {
    dispatch({
      type: types.ADS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//add category
export const addcat = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  var sdata = JSON.stringify(data);
  try {
    const res = await Axios.post(`/api/category/`, sdata, config);
    dispatch({
      type: types.CATEGORY_ADDED,
      payload: res.data,
    });
    dispatch(setAlert("Your Category is added", "success"));
    dispatch(getallcat());
  } catch (err) {
    dispatch({
      type: types.CATEGORY_ADD_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert(err.response.data.msg, "danger"));
  }
};

//get all category
export const getallcat = () => async (dispatch) => {
  try {
    const res = await Axios.get(`/api/category/`);
    dispatch({
      type: types.CATEGORY_FETCHED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.CATEGORY_FETCHED_FAILED,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
