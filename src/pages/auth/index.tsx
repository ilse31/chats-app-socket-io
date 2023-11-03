import React from "react";
import { loginValues, registerValues } from "../../constant/values/Auth";
import FormData from "../../components/Form";
import { LoginSchema, RegisterSchema } from "../../constant/validate/Auth";
import Button from "../../components/buttons";

const Auth = () => {
  // const navigate = useNavigate();
  const [isLogin, setIsLogin] = React.useState<boolean>(true);
  return (
    <>
      <FormData
        initialValues={isLogin ? loginValues : registerValues}
        handleSubmit={() => console.log("data")}
        validationSchema={isLogin ? RegisterSchema : LoginSchema}
      />
      <Button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Register" : "Login"}
      </Button>
    </>
  );
};

export default Auth;
