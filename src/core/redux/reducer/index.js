import { combineReducers } from "redux";

import account from './account';
import common from "./common";
import userBalance from "./user-balance";

export default combineReducers({
    account,
    common,
    userBalance
});