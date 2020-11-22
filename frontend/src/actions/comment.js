import Axios from "axios";
import * as types from "./types";
import { setAlert } from "./alert";
import { singleAd } from "./ads";

//get comment of ads
export const getcomment = (id) => async (dispatch) => {
  try {
    const res = await Axios.get(`/api/ads/comment/${id}`);
    dispatch({
      type: types.LOAD_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.LOAD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//post comment
export const postcomment = (id, commentext) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ commentext });
  try {
    const res = await Axios.post(`/api/comment/${id}`, body, config);
    dispatch({
      type: types.ADD_COMMENT,
      payload: res.data,
    });
    dispatch(singleAd(id));
  } catch (err) {
    dispatch({
      type: types.ERROR_COMMENT,
    });
  }
};

//delete comment
export const deleteComment = (id, comid) => async (dispatch) => {
  try {
    const res = await Axios.delete(`/api/comment/${id}/${comid}`);
    dispatch({
      type: types.COMMENT_DELETED,
      payload: res.data,
    });
    dispatch(singleAd(id));
    dispatch(setAlert("Comment Deleted", "success"));
  } catch (err) {
    dispatch({
      type: types.ERROR_COMMENT,
    });
  }
};

//add reply
export const postreply = (id, comment_id, reply) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ reply });
  try {
    const res = await Axios.put(
      `/api/comment/reply/${id}/${comment_id}`,
      body,
      config
    );
    dispatch({
      type: types.ADD_REPLY,
      payload: res.data,
    });
    dispatch(singleAd(id));
  } catch (err) {
    dispatch({
      type: types.ERROR_REPLY,
    });
    dispatch(setAlert("Error Reply", "warning"));
  }
};
