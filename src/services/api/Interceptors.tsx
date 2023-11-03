import axios, { InternalAxiosRequestConfig } from "axios";
import moment from "moment";
import { API } from "./API";
import { getLocalStorage } from "../../helpers/localstorage";

API.interceptors.request.use(
  async (req: InternalAxiosRequestConfig) => {
    const token = JSON.parse(getLocalStorage("token") || "{}");
    const { expires_at, refresh_token } = token;

    let accessToken = token.access_token;

    if (moment(new Date().toISOString()).isAfter(expires_at)) {
      accessToken = await getRefreshToken(refresh_token);
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
      refresh_token: refreshToken,
    };
    const res = await axios.post("localhost:4000/api/", payload);
    console.log(res);
    // localStorage.setItem("token", JSON.stringify(res.data.data));
    return res.data.data.access_token;
  } catch (error) {
    console.log(error);
    window.location.href = "/login";
  }
};
