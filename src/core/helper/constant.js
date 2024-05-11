export const MSG = {
  SUCCESS_CODE: 200,
  LOGIN_MSG: "login successfully",
  PASSWORD_REGEX_MSG:
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
  PASSWORD_REGEX_EXP:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  REQ_PWD: "Password",
  REQ_CONFIRM_PWD: "Confirm password",
  PASSWORD_NOT_MATCH: "Passwords does not match",
  REQ_PHONE_CODE: "Phone code",
  PHONE_REGEX_MSG: "Phone number is not valid",
  PHONE_INVALID: "Invalid Phone number",
  REQ_PHONE_NUM: "Phone number",
  REQ_MIN_NUM: "Minimum 10 numbers are expected",
  REQ_MAX_NUM: "Maximum 10 numbers are allowed",
  PASSWORD_REQ: "Password is required field",
  PASSWORD_MIN: "Minimum Characters is required",
  PASSWORD_MAX: "Maximun 20 Characters are allowed",
  MAX_NAME: "Maximum 15 Characters are allowed",
  TERMS_AND_CONDITON: "The terms and conditions must be accepted",
  REQ_GST_CERTIFICATE: "Please upload the certificate",
  REQ_REGISTERD_CERTIFICATE: "Please upload the certificate",
  REQ_COMPANY_LOGO: "Please upload the logo",
  REQ_OWNER_ID: "Please upload the identity",
  REQ_GST_IN: "Gst number",
  REQ_DOOR_NO: "Door no",
  REQ_STREET: "Street",
  REQ_CITY: "City",
  REQ_STATE: "State",
  REQ_COUNTRY: "Country",
  REQ_ZIPCODE: "Zipcode",
  REQ_ACCOUNT_TYPE: "Account type",
  REQ_DISPLAY_NAME: "Display name",
  REQ_OWNER_IDEDNITY: "Owner Identity",
  REQ_BANK_NAME: "Bank name",
  REQ_IFSC_CODE: "Ifsc Code",
  REQ_BRANCH: "Branch",
  REQ_ACCOUNT_NO: "Account no",
  REQ_BANK_PROOF: "Please upload the proof",

  REQ_BENIFICIARY_NAME: "Beneficiary name",
  NOT_ALLOWED_SPECIAL_CHAR: "Special characters not allowed",

  PHONE_REGEX:
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  PASSWORD_REGEX:
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",

  GST_REGEX: /^([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1})$/,
  GST_INVALID_MSG: "GST number should be capital",

  IFSC_REGEX: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  IFSC_REGEX_MSG: "Invalid IFSC code",

  REQ_PASSWORD: "Password",
  REQ_CONFIRM_PASSWORD: "Confirm password is a required",

  REQ_OLD_PASSWORD: "Old Password",
  REQ_NEW_PASSWORD_MATCH: "Old password and new password is equal",
  REQ_PASSWORD_MIN: "Minimum 8 Characters is required",
  REQ_PASSWORD_NOT_MATCH: "Passwords does not match",

  REQ_TYPE: "Type",
  REQ_ACTION: "Action",
  REQ_REASON_ADJUSTOMENT: "Reason adjustment",
  REQ_ALT_PHONE_NUM: "Phone number is already registered",
  REQ_ALT_COMPANY_NAME: "Company name is already registered",

  REQ_QUESTION: "Question",
  REQ_OPTIONS: "Minimum option",
  REQ_START_DATE: "Required",
  REQ_START_TIME: "Required",
  REQ_END_DATE: "Required",
  REQ_END_TIME: "Required",
  REQ_SOURCE: "Source",
  REQ_SHOW_MY_QUS_ON: "Question on",
};

export const DEFAULT_SORT_BY = "_id";
export const DEFAULT_SORT = -1;
export const DEFAULT_SORT_CREATBY = "createdAt";
export const DEFAULT_PER_PAGE = 10;

export const DEFAULT_ADV_FILTER = {
  skip: 0,
  limit: DEFAULT_PER_PAGE,
  sortBy: DEFAULT_SORT_BY,
  sort: DEFAULT_SORT,
  filter: {},
  search: "",
};
export const USERS_FILTER = {
  skip: 0,
  limit: DEFAULT_PER_PAGE,
  sortBy: DEFAULT_SORT_BY,
  sort: DEFAULT_SORT,
  search: "",
  filter: {},
};

export const LIVE_EVENTS = "live-events";
export const CLOSED_EVENTS = "closed-events";
export const PortfolioLinks = [
  {
    label: "Live Events",
    value: LIVE_EVENTS,
  },
  {
    label: "Closed Events",
    value: CLOSED_EVENTS,
  },
];

export const transactionLinks = [
  {
    label: "Account",
    value: "account",
  },
  // {
  //   label: "Bonus",
  //   value: "bonus",
  // },
  {
    label: "Winnings",
    value: "winnings",
  },
];

export const ugcLinks = [
  {
    label: "Created by me",
    value: "created-by-me",
  },
  {
    label: "Participated",
    value: "participated",
  },
  {
    label: "Expired",
    value: "expired",
  },
];

export const questionStatus = [
  {
    displayText: "Pending",
    status: 1,
    label: "Upcoming",
  },
  {
    displayText: "Ongoing",
    status: 2,
    label: "Live",
  },
  {
    displayText: "Settled",
    status: 3,
    label: "Completed",
  },
  {
    displayText: "Paused",
    status: 4,
    label: "Paused",
  },
  {
    displayText: "Refunded",
    status: 5,
    label: "Cancelled",
  },
  {
    displayText: "Pending",
    status: 8,
    label: "Pending",
  },
];
