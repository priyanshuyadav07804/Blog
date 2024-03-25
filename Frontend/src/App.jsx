import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Register from "./pages/Register";
import Topbar from "./pages/Topbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";
import Verify_Email from "./pages/Verify_Email";
import Forgot_Password from "./pages/Forgot_Password";
import Reset_Password from "./pages/Reset_Password";

// Component for routes with top bar
const TopbarRoutes = () => (
  <>
    <Topbar />
    <Outlet />
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<TopbarRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/user/verify-email" element={<Verify_Email />} />
        <Route path="/forgot-password" element={<Forgot_Password />} />
        <Route path="/user/reset-password" element={<Reset_Password />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
