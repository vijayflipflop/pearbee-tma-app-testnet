import { PROFILE_ACTION } from "../constant";

export const reloadProfileAction = (payload) => (dispatch) => {
  dispatch({
    type: PROFILE_ACTION,
    payload,
  });
};
