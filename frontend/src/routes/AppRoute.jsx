import { BrowserRouter, Route, Routes } from "react-router-dom";

//pages and components
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import UserDashboard from "../dashboard/UserDashboard";
import CreateProduct from "../product/CreateProduct";
import ProductCategory from "../category/ProductCategory";
import CategoryPage from "../category/CategoryPage";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<ProductCategory />}>
          <Route index element={<CategoryPage />} />
          <Route path="category/:category" element={<CategoryPage />} />
        </Route>

        <Route path="/user" element={<UserDashboard />}>
          <Route path="products" element={<CreateProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
