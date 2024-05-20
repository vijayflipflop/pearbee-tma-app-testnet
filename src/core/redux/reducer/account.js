// import constant
import {
  SET_LOGGED_IN_USER,
  REMOVE_LOGGED_IN_USER,
  SET_LOGGED_USER_DATA,
  MOBILE_NUMBER_ACTION,
  USER_WALLET_ACTIONS,
  RELOAD_WALLET_ACTIONS,
  TON_LOGGED_ACTION,
  RELOAD_API_AFTER_BET_ACTIONS,
} from "../constant";
import {
  setAuthUser,
  removeAuthUser,
  setLoggedUser,
} from "core/helper/localstorage";

const initialState = {
  isLoggedIn: false,
  token: "",
  authUser: "",
  profile: null,
  coin: 0,
  mobileNumber: "",
  wallet: null,
  reloadWallet: false,
  isLoggedTon: false,
  reloadApi: false
};

const account = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case MOBILE_NUMBER_ACTION:
      return {
        ...state,
        ...payload,
      };
    case SET_LOGGED_IN_USER:
      setAuthUser(payload);
      return {
        ...state,
        ...payload,
      };
    case REMOVE_LOGGED_IN_USER:
      removeAuthUser();
      return {
        ...state,
        ...payload,
      };
    case SET_LOGGED_USER_DATA:
      setLoggedUser(payload);
      return {
        ...state,
        profile: payload,
      };
    case USER_WALLET_ACTIONS:
      return {
        ...state,
        wallet: payload,
      };
    case RELOAD_WALLET_ACTIONS:
      return {
        ...state,
        reloadWallet: payload,
      };
    case RELOAD_API_AFTER_BET_ACTIONS:
      return {
        ...state,
        reloadApi: payload,
      };
    case TON_LOGGED_ACTION:
      return {
        ...state,
        isLoggedTon: payload,
      };
    default:
      return state;
  }
};

export default account;
