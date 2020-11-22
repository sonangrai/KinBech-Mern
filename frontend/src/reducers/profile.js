import * as types from "../actions/types";

const initialState = {
  profile: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.PROFILE_LOADED:
      return {
        ...state,
        profile: payload,
      };
    case types.PROFILE_LOAD_FAIL:
      return {
        ...state,
        profile: [],
      };
    default:
      return state;
  }
}
