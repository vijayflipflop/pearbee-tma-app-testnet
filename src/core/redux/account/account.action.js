import { SET_LOGGED_IN_USER, REMOVE_LOGGED_IN_USER, SET_LOGGED_USER_DATA, MOBILE_NUMBER_ACTION, USER_WALLET_ACTIONS, RELOAD_WALLET_ACTIONS, TON_LOGGED_ACTION } from '../constant';

export const loginAction = (user) => dispatch => {
    dispatch({
        type: SET_LOGGED_IN_USER,
        payload: user,
    })
};

export const mobileNumberAction = (payload) => dispatch => {
    dispatch({
        type: MOBILE_NUMBER_ACTION,
        payload,
    })
};

export const logoutAction = () => dispatch => {
    dispatch({
        type: REMOVE_LOGGED_IN_USER,
        payload: {
            isLoggedIn: false,
            token: '',
            authUser: '',
        }
    })
};

export const loggedProfileDataAction = (payload) => dispatch => {
    dispatch({
        type: SET_LOGGED_USER_DATA,
        payload,
    })
};

export const userWalletActions = (payload) => dispatch => {
    dispatch({
        type: USER_WALLET_ACTIONS,
        payload,
    })
};

export const reloadWalletAction = (payload) => dispatch => {
    dispatch({
        type: RELOAD_WALLET_ACTIONS,
        payload,
    })
};

export const tonLoggedAction = (payload) => dispatch => {
    dispatch({
        type: TON_LOGGED_ACTION,
        payload,
    })
};