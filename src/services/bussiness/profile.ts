import API from "../api/Interceptors";
import { getMeData } from "../types";

export class ProfileService {
  getMe(data: getMeData) {
    return API.post("/profile/getmes", data);
  }
}
