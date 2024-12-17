import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <div className="font-poppins text-xl shadow-sm border-b font-medium">
      <nav className="container mx-auto px-9 py-6 flex items-center justify-between space-y-4">
        {!isAuthenticated && (
          <NavLink to="/" className="text-2xl hover:text-gray-500">
            RD
          </NavLink>
        )}
        <div className="flex space-x-4 ml-auto">
          {isAuthenticated ? (
            <div>
              <button
                onClick={handleLogout}
                className="px-2 hover:text-red-800"
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <NavLink to="/login" className="px-2 hover:text-gray-500">
                Login
              </NavLink>
              <NavLink to="/signup" className="px-2 hover:text-gray-500">
                Signup
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
