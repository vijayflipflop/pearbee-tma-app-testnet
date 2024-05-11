import {
  PROFILE_ACTION,
} from "../constant";

const initialState = {
  reloadProfile: false,
};

const common = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_ACTION:
      return {
        ...state,
        reloadProfile: !state.reloadProfile,
      };
    default:
      return {
        ...state,
      };
  }
};

export default common;
