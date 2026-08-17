import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiShoppingBag, FiUser, FiMapPin, FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="premium-navbar">
      <Link to="/" className="nav-logo">
        Food<span>Hub</span>
      </Link>

      <nav className="nav-menu">
        <Link to="/">Home</Link>
        <Link to="/restaurants">Restaurants</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <div className="nav-location">
        <FiMapPin />
        <span>Indore</span>
      </div>

      <div className="nav-actions">
        <button className="nav-icon-btn">
          <FiSearch />
        </button>

        <button className="nav-icon-btn cart-btn" onClick={() => navigate("/cart")}>
          <FiShoppingBag />
          <span>2</span>
        </button>

        {user ? (
          <>
            <button className="login-button" onClick={() => navigate("/profile")}>
              <FiUser />
              Profile
            </button>

            <button className="nav-icon-btn" onClick={handleLogout}>
              <FiLogOut />
            </button>
          </>
        ) : (
          <button className="login-button" onClick={() => navigate("/login")}>
            <FiUser />
            Login
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;