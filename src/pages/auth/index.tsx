import React from "react";
import { loginValues, registerValues } from "../../constant/values/Auth";
import FormData from "../../components/Form";
import { LoginSchema, RegisterSchema } from "../../constant/validate/Auth";
import Button from "../../components/buttons";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginService } from "../../services/bussiness/auth";
import { getLocalStorage, setLocalStorage } from "../../helpers/localstorage";
import socket from "../../services/socket";

const Auth = () => {
  const navigate = useNavigate();
  const loginService = new LoginService();
  const [isLogin, setIsLogin] = React.useState<boolean>(true);

  const inititalValues = isLogin ? loginValues : registerValues;

  const params = useLocation();

  const handleSubmit = async (values: any) => {
    try {
      let response;
      if (isLogin) {
        response = await loginService.LoginUser(values);
      } else {
        response = await loginService.RegisterUser(values);
      }

      socket.auth = {
        email: values.email,
      };
      socket.connect();

      const token = response.data.data.token;
      const user = response.data.data.user;
      setLocalStorage("token", token);
      setLocalStorage("user", user);

      // Assuming navigate() is an asynchronous function
      navigate("/profile");

      // Now, after navigation, you might want to wait a bit before logging the email
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (params.pathname === "/auth/register") {
      setIsLogin(false);
    } else setIsLogin(true);
  }, [params]);

  // React.useEffect(() => {
  //   const token = getLocalStorage("token");
  //   if (!token) {
  //     navigate("/");
  //   }
  // }, [navigate]);

  return (
    <>
      <div className='container mx-auto flex flex-col gap-3'>
        <FormData
          initialValues={inititalValues}
          handleSubmit={handleSubmit}
          validationSchema={isLogin ? LoginSchema : RegisterSchema}
        />
        <Button
          onClick={() => navigate(isLogin ? "/auth/register" : "/auth/login")}
        >
          {isLogin ? "Register" : "Login"}
        </Button>
      </div>
    </>
  );
};

export default Auth;
