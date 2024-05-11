export const BASE_PATH = "";

export const PRE_LOGIN_PATH = `${BASE_PATH}/`;
export const POST_LOGIN_PATH = `${BASE_PATH}/`;

export const LOGIN_PATH = `${BASE_PATH}/login`;
export const OTP_PATH = `${BASE_PATH}/otp`;
export const FORGOT_PATH = `${BASE_PATH}/forgot-password`;

export const CHANGE_FORGOT_PATH = `${BASE_PATH}/reset-password`;
export const UNKNOWN_PATH = `*`;
export const DASH_PATH = `${BASE_PATH}/`;

export const SETTING = `${BASE_PATH}/settings`;
export const SETTING_SUPPORT = `${BASE_PATH}/setting/support`;
export const SETTING_TERMS_CONDITIONS = `${BASE_PATH}/settings/terms`;
export const SETTING_INVITE = `${BASE_PATH}/setting/invites`;
export const SETTING_INVITE_YOURS = `${BASE_PATH}/setting/invite/yours`;
export const SETTING_WALLET = `${SETTING}/wallet`;
export const TRANSACTION = `${SETTING_WALLET}/transactions`;
export const SETTING_RECHARGE = `${SETTING_WALLET}/recharge`;
export const SETTING_TERM = `${SETTING}/terms`;
export const SETTING_PRIVACY = `${SETTING}/privacy`;
export const SETTING_FAQ = `${SETTING}/faq`;

export const CATEGORIES = `${BASE_PATH}/category`;
export const CATEGORY_BY_ID_PATH = `${CATEGORIES}/:id`;
export const CATEGORY_QUESTION_OVERVIEW_ID_PATH = `${CATEGORY_BY_ID_PATH}/:questionId`;

export const UGC = `${BASE_PATH}/ugc`
export const ASK = `${UGC}/ask`;
export const EDIT_ASK_BY_ID = `${ASK}/:id`;
export const IPL = `${BASE_PATH}/ipl`;
export const IPL_ROOM_ID = `${IPL}/:id/:questionCategoryId`;
export const IPL_TRIVIZHA_BY_NAME_PATH = `${IPL_ROOM_ID}/:name`;
export const MY_PORTFOLIO = `${BASE_PATH}/my-portfolio`;

export const LEADERBOARD = `${BASE_PATH}/leaderboard`;
