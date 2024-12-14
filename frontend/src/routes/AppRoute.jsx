import { BrowserRouter, Route, Routes } from "react-router-dom";

//pages and components
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
