import axios from "core/config/axios";
import { utils } from "core/helper";

const Services = {
  post: async function (authUrl, payload) {
    return axios
      .post(authUrl, payload)
      .then((resp) => {
        return resp.data;
      })
      .catch((error) => {
        utils.showErrMsg(utils.handleErr(error));
      });
  },

  get: async function (url) {
    return axios
      .get(url)
      .then((resp) => {
        return resp.data;
      })
      .catch((error) => utils.showErrMsg(utils.handleErr(error)));
  },

  getFilter: async function (url, filter) {
    Object.keys(filter).forEach((k) => filter[k] === "" || filter[k] === undefined && delete filter[k]);
    const filterString = new URLSearchParams(filter).toString();
    return axios
      .get(url + "?" + filterString)
      .then((resp) => {
        return resp.data;
      })
      .catch((error) => utils.showErrMsg(utils.handleErr(error)));
  },

  put: async function (url, payload) {
    return axios
      .put(url, payload)
      .then((resp) => {
        return resp.data;
      })
      .catch((error) => utils.showErrMsg(utils.handleErr(error)));
  },
};

export default Services;
