import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiMapPin, FiShoppingBag, FiHeart, FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const orders = JSON.parse(localStorage.getItem("foodhub_orders")) || [];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <main className="profile-page">
      <section className="profile-header">
        <span>MY PROFILE</span>
        <h1>Welcome, {user?.name || "Foodie"} 👋</h1>
        <p>Manage your account, orders, addresses and preferences.</p>
      </section>

      <section className="profile-layout">
        <div className="profile-card">
          <div className="profile-avatar">
            <FiUser />
          </div>

          <h2>{user?.name || "FoodHub User"}</h2>
          <p>{user?.email || "user@foodhub.com"}</p>

          <button onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>
        </div>

        <div className="profile-dashboard">
          <div className="profile-stat">
            <FiShoppingBag />
            <h3>{orders.length}</h3>
            <p>Total Orders</p>
          </div>

          <div className="profile-stat">
            <FiHeart />
            <h3>0</h3>
            <p>Wishlist Items</p>
          </div>

          <div className="profile-stat">
            <FiMapPin />
            <h3>1</h3>
            <p>Saved Address</p>
          </div>

          <div className="profile-info">
            <h2>Account Details</h2>

            <div>
              <FiUser />
              <span>{user?.name || "FoodHub User"}</span>
            </div>

            <div>
              <FiMail />
              <span>{user?.email || "user@foodhub.com"}</span>
            </div>

            <div>
              <FiMapPin />
              <span>Indore, India</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Profile;