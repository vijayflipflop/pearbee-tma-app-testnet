export const BASE_PATH = process.env.REACT_APP_BASE_PATH;
export const PEARBEE_VERIFY = BASE_PATH + "-auth/verify";
export const GET_USER_BALANCE = BASE_PATH + "/getUsersBalance";
export const REFRESH_TOKEN_URL = "auth/exchange-token";
export const FORGOT_PASSWORD = "user/forgotpwd";
export const CHANGE_PASSWORD = "user/changepwd";
export const RESET_PASSWORD = "user/resetpwd";
export const COMMON_DATA = "common";
export const UPLOAD_PHOTOS = "common/images";
export const REMOVE_IMAGE = "remove-image";
export const USERS_FILTERS = "user/filter-users";
export const LIVE_QUESTIONS = BASE_PATH + "/v1/getLiveQuestion_app";
export const CATEGORY = BASE_PATH + "/getCategories_app";
export const CATEGORYBYID = BASE_PATH + "/getCategoriesById?categoriesId=";
export const CATEGORY_QUESTION =
  BASE_PATH + "/getLiveQuestionByCatgory_app?categoriesId=";
export const CATEGORY_QUESTION_BY_ID =
  BASE_PATH + "/v1/getQuestionsById_App?questionId=";
export const CONFIRM_BED = BASE_PATH + "/v1/confirmBet";
export const TRANSACTIONS = BASE_PATH + "/getuserInAppTransaction_App";
export const WITHDRAW_TRANSACTIONS = BASE_PATH + "/withdrawTransactions";
export const DEPOSIT_TRANSACTIONS = BASE_PATH + "/getUserFiatTransaction_App";
export const UGC_CREATE_QUESTION = BASE_PATH + "/v1/UGCQuestionByUser";
export const PORTFOLIO_LIVE_QUESTIONS = BASE_PATH + "/getProtofolioLive";
export const PORTFOLIO_CLOSED_QUESTIONS = BASE_PATH + "/getProtofolioComplete";
export const GET_PORTFOLIO_LIVE_DETAILS =
  BASE_PATH + "/getProtofolioLiveDetails?questionId=";
export const GET_USER_BAL = BASE_PATH + "/getUsersBalance";
export const GET_COMPLETED_DETAILS =
  BASE_PATH + "/getProtofolioCompleteDetails?questionId=";
export const QUESTION_TRADES =
  BASE_PATH + "/getProtofolioCompletebyQuestion?questionId=";
export const WALLET_PURCHASE = BASE_PATH + "/purchase-items";
export const GET_BANNER = BASE_PATH + "/getBanner_app";
export const LEADER_BOARD = BASE_PATH + "/leaderboard?type=0";
export const GET_EXPIRED_QUESTIONS = BASE_PATH + "/UGCExpiredQuestions";
export const USER_TRADE_QUESTIONS = BASE_PATH + "/userTradeUGCQuestion";
export const GET_PARTICIPATED_QUESTIONS = BASE_PATH + "/UGCJoinedQuestions";
export const GET_QUESTION_BY_ID =
  BASE_PATH + "/updateUGCQuestionByUser?question_id=";
export const ROOMS_LIST = BASE_PATH + "/room";
export const ROOM_DETAILS = BASE_PATH + "/room-status?roomId=";

// un-used
export const LOGIN_URL = "/auth/userLogin";
