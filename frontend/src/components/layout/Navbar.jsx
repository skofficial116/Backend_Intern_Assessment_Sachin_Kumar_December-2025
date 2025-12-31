import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-purple-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="font-semibold">Purple Merit Technologies</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm">
          {user.fullName} ({user.role})
        </span>

        {user.role === "admin" && (
          <Link to="/admin" className="underline">
            Admin
          </Link>
        )}

        <Link to="/profile" className="underline">
          Profile
        </Link>

        <button onClick={logout} className="text-sm underline">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
