import * as types from "../actions/types";

const initialState = {
  ads: [],
  ad: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_ADS:
      return {
        ...state,
        ads: payload,
        loading: false,
      };
    case types.GET_AD:
      return {
        ...state,
        ad: payload,
        loading: false,
      };
    case types.ADS_ADDED:
      return {
        ...state,
        ad: [payload, ...state.ad],
      };
    default:
      return state;
  }
}
