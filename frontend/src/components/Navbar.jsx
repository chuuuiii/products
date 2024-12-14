import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-white shadow-sm border-b font-poppins sticky top-0">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink to="/" className="text-2xl">
          RD
        </NavLink>
        <div className="flex space-x-2 text-lg">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `text-gray-800 hover:text-gray-600 ${
                isActive ? "font-semibold" : "font-normal"
              }`
            }
          >
            Log in
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `text-gray-800 hover:text-gray-600 ${
                isActive ? "font-semibold" : "font-normal"
              }`
            }
          >
            Sign up
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
