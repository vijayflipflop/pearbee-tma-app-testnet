export const setAuthToken = (token) => {
  return localStorage.setItem("token", token);
};

export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  return token ? token : "";
};

export const setAuthUser = (user) => {
  console.log("user::", user);
  // setAuthRefreshToken(user?.authUser?.data?.jwt_token);
  // setAuthToken(user?.authUser?.data?.jwt_token);
  setAuthRefreshToken(user?.token);
  setAuthToken(user?.token);
  return localStorage.setItem("user", JSON.stringify(user));
};

export const getAuthUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const removeAuthToken = () => {
  return localStorage.removeItem("token");
};

export const removeAuthUser = () => {
  removeAuthToken();
  removeAuthRefreshToken();
  return localStorage.removeItem("user");
};

export const setLoggedUser = (user) => {
  localStorage.setItem("profile", JSON.stringify(user));
  return true;
};

export const setUserID = (profileID) => {
  return localStorage.setItem("userid", JSON.stringify(profileID));
};

export const getUserID = () => {
  return JSON.parse(localStorage.getItem("userid"));
};

export const removeUserID = () => {
  return localStorage.removeItem("userid");
};

export const getAuthRefreshToken = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  return refreshToken ? refreshToken : "";
};

export const setAuthRefreshToken = (refreshToken) => {
  return localStorage.setItem("refreshToken", refreshToken);
};

export const removeAuthRefreshToken = () => {
  return localStorage.removeItem("refreshToken");
};
