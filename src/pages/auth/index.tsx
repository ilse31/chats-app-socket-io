import React from "react";
import { loginValues, registerValues } from "../../constant/values/Auth";
import FormData from "../../components/Form";
import { LoginSchema, RegisterSchema } from "../../constant/validate/Auth";
import Button from "../../components/buttons";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginService } from "../../services/bussiness/auth";
import { setLocalStorage } from "../../helpers/localstorage";
import socket from "../../services/socket";

const Auth = () => {
  const navigate = useNavigate();
  const loginService = new LoginService();
  const [isLogin, setIsLogin] = React.useState<boolean>(true);

  const inititalValues = isLogin ? loginValues : registerValues;

  const params = useLocation();

  const handleSubmit = async (values: any) => {
    if (isLogin) {
      await loginService
        .LoginUser(values)
        .then((Resp) => {
          console.log("valuies", values.email);
          socket.auth = {
            email: values.email,
          };
          socket.connect();
          setLocalStorage("token", Resp.data.data.token);
          setLocalStorage("user", Resp.data.data.user);
          navigate("/profile");
        })
        .catch((err) => console.log(err));
    } else {
      await loginService
        .RegisterUser(values)
        .then((Resp) => {
          socket.auth = {
            email: values.email,
          };
          socket.connect();
          setLocalStorage("token", Resp.data.data.token);
          setLocalStorage("user", Resp.data.data.user);
          navigate("/profile");
        })
        .catch((err) => console.log(err));
    }
  };

  React.useEffect(() => {
    if (params.pathname === "/auth/register") {
      setIsLogin(false);
    } else setIsLogin(true);
  }, [params]);
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
