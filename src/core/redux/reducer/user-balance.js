// import constant
import {
  UPDATE_USER_BALANCE
} from "../constant";

const initialState = {};

const userBalance = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USER_BALANCE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default userBalance;
