import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Auth from "../pages/auth";
import Chats from "../pages/chats";

const Routed = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      {/* <Route element={<DesignSystem />}>
        <Route path='/design-system'>
          <Route index element={<HomeDesignSystem />} />
          <Route path='buttons' element={<ButtonsPages />} />
          <Route path='form' element={<FormPages />} />
          <Route path='alerts' element={<AlertPages />} />
          <Route path='modals' element={<ModalPages />} />
        </Route>
      </Route> */}
      <Route path='/auth/login' element={<Auth />} />
      <Route path='/auth/register' element={<Auth />} />
      <Route path='/profile' element={<Chats />} />
    </Routes>
  );
};

export default Routed;
