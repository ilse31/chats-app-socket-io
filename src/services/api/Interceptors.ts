import axios, { InternalAxiosRequestConfig, AxiosInstance } from "axios";
import moment from "moment";

import { getLocalStorage, setLocalStorage } from "../../helpers/localstorage";

const API: AxiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  async (req: InternalAxiosRequestConfig) => {
    const token = getLocalStorage("token") || {};
    const { expired_at, refreshToken } = token;

    let accessToken = token.accessToken;

    if (moment(new Date().toISOString()).isAfter(expired_at)) {
      accessToken = await getRefreshToken(refreshToken);
      console.log("After token refresh:", accessToken);
      req.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      req.headers.Authorization = `Bearer ${accessToken}`;
      console.log("Token not expired");
    }

    return req;
  },
  (error) => {
    Promise.reject(error);
  }
);

const getRefreshToken = async (refreshToken: string) => {
  try {
    const payload = {
      refreshToken: refreshToken,
    };
    console.log("refresh", refreshToken);
    const res = await axios.post(
      "http://localhost:4000/api/v1/auth/refreshtoken",
      payload
    );
    console.log("responserefresh", res.data.data);
    setLocalStorage("token", JSON.stringify(res.data.data));
    return res.data.data.accessToken;
  } catch (error) {
    console.log(error);
    localStorage.clear();
    window.location.href = "/";
  }
};

export default API;
