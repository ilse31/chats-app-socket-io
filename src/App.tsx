import "./App.css";
import socket from "./services/socket";

import Routed from "./router";

function App() {
  // const loginService = new LoginService();

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormValue({
  //     ...formValue,
  //     [name]: value,
  //   });
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   try {
  //     e.preventDefault();
  //     console.log(socket);
  //     await loginService.RegisterUser(formValue);
  //     const email = formValue.email;
  //     socket.auth = { email };
  //     socket.connect();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  socket.on("connection", (user) => {
    console.log(user);
  });

  socket.on("users", (users) => {
    console.log(users);
  });

  return (
    <>
      <Routed />
    </>
  );
}

export default App;
