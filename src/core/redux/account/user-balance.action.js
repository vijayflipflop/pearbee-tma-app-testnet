import { UPDATE_USER_BALANCE } from '../constant';

export const updateUserBalanceAction = (userBalanceObj) => dispatch => {
    dispatch({
        type: UPDATE_USER_BALANCE,
        payload: userBalanceObj,
    })
};