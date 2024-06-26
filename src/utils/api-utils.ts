import axios, { AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "../services/api-urls";
// import { api } from "../config";

axios.defaults.baseURL = API_BASE_URL;
// content type
axios.defaults.headers.post["Content-Type"] = "application/json";

// content type
const authUser: any = sessionStorage.getItem("authUser");
const token = JSON.parse(authUser) ? JSON.parse(authUser).access_token : "this is dummy token";
if (token) axios.defaults.headers.common["Authorization"] = "Token " + token;

// intercepting to capture errors
axios.interceptors.response.use(
  function (response: any) {
    return response.data ? response.data : response;
  },
  function (error: any) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    switch (error?.response?.status) {
      // case 500:
      //   break;
      case 401:
        console.log("Expired");
        break;
      // case 404:
      //   break;
    }
    return Promise.reject(error);
  }
);

class APIClient {
  /**
   * Fetches data from given url
   */

  //  get = (url, params) => {
  //   return axios.get(url, params);
  // };
  get = (url: any, params?: any) => {
    let response;

    if (params) {
      const queryParams = new URLSearchParams();

      for (const key in params) {
        if (Array.isArray(params[key])) {
          params[key].forEach((value: any) => {
            queryParams.append(key + "[]", value);
          });
        } else {
          queryParams.append(key, params[key]);
        }
      }

      const queryString = queryParams.toString();
      response = axios.get(`${url}?${queryString}`);
    } else {
      response = axios.get(`${url}`);
    }

    return response;
  };
  /**
   * post given data to url
   */
  post = (url: string, data: any, config?: AxiosRequestConfig<any>) => {
    return axios.post(url, data, config);
  };
  /**
   * Updates data
   */
  update = (url: any, data: any) => {
    return axios.patch(url, data);
  };

  put = (url: any, data?: any) => {
    return axios.put(url, data);
  };
  /**
   * Delete
   */
  delete = (url: any, config?: any) => {
    return axios.delete(url, { ...(config ?? {}) });
  };
}

const apiClient = new APIClient();

export { APIClient, apiClient };
