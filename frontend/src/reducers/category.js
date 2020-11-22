import * as types from "../actions/types";

const initialState = {
  category: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.CATEGORY_FETCHED:
      return {
        ...state,
        category: payload,
      };
    case types.CATEGORY_FETCHED_FAILED:
      return {
        ...state,
        category: [],
      };
    default:
      return state;
  }
}
