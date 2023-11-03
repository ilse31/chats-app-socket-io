import { API } from "../api/API";
import { loginData, registerData } from "../types";

export class LoginService {
  RegisterUser(data: registerData) {
    return API.post("/auth/register", data);
  }
  LoginUser(data: loginData) {
    return API.post("/auth/login", data);
  }
}
