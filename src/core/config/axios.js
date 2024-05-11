import axios from "axios";
import { localStorage } from "core/helper";
import { REFRESH_TOKEN_URL } from "core/service/api.url.service";
import { useSearchParams } from "react-router-dom";

let isRefreshing = false;
let subscribers = [];

function onRefreshed({ authorisationToken }) {
  subscribers.map((cb) => cb(authorisationToken));
}

function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}

const getAxiosInstance = () => {
  // const [getTokenParams] = useSearchParams();
  // let token = getTokenParams.get("token");

  const defaultOptions = {
    baseURL: process.env.REACT_APP_API_URL,
  };
  let instance = axios.create(defaultOptions);

  instance.interceptors.request.use(
    async (config) => {
      const token = localStorage.getAuthToken();
      // const token = process.env.REACT_APP_API_TOKEN;
      console.log("header token::", token);
      config.headers.Authorization = token ? `Bearer ${token}` : "";
      return config;
    },
    (err) => {
      Promise.reject(err);
    }
  );
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (err) {
      const {
        config,
        response: { status },
      } = err;
      const originalRequest = config;
      if (
        status === 401 &&
        err.response.data.meta.code === 401 &&
        !originalRequest._retry
      ) {
        if (!isRefreshing) {
          isRefreshing = true;
          const refreshToken = localStorage.getAuthRefreshToken()
          // const refreshToken = process.env.REACT_APP_API_TOKEN;
          getAxiosInstance()
            .post(REFRESH_TOKEN_URL, { refreshToken })
            .then((resp) => {
              const { data: userData } = resp.data;
              isRefreshing = false;
              onRefreshed({ authorisationToken: userData.token });
              subscribers = [];
              localStorage.setAuthToken(userData.token);
              return resp.data;
            })
            .catch((err) => {
              return err;
            });
        }
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axios(originalRequest));
          });
        });
      }
      return Promise.reject(err);
    }
  );
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getAuthToken();
    // const token = process.env.REACT_APP_API_TOKEN;
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });
  return instance;
};

export default getAxiosInstance();
