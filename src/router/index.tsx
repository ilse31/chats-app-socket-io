import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Auth from "../pages/auth";

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
      <Route path='/auth' element={<Auth />} />
    </Routes>
  );
};

export default Routed;
