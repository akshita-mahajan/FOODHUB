import "./Profile.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiMapPin,
  FiShoppingBag,
  FiHeart,
  FiLogOut,
  FiEdit2,
  FiSave,
  FiX,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../services/authService";

function Profile() {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* =========================
     ORDERS
  ========================== */

  const orders =
    JSON.parse(
      localStorage.getItem("foodhub_orders")
    ) || [];

  /* =========================
     WISHLIST
  ========================== */

  const wishlist =
    JSON.parse(
      localStorage.getItem("foodhub_wishlist")
    ) || [];

  /* =========================
     HANDLE INPUT
  ========================== */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================
     START EDIT
  ========================== */

  const handleEdit = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
    });

    setMessage("");
    setError("");
    setIsEditing(true);
  };

  /* =========================
     CANCEL EDIT
  ========================== */

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
    });

    setMessage("");
    setError("");
    setIsEditing(false);
  };

  /* =========================
     UPDATE PROFILE
  ========================== */

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const data = await updateProfile({
        name: formData.name,
        email: formData.email,
      });

      if (data.user) {
        updateUser(data.user);
      }

      setIsEditing(false);
      setMessage("Profile updated successfully.");

      setTimeout(() => {
        setMessage("");
      }, 5000);
    } catch (err) {
      console.error(
        "Profile update error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     LOGOUT
  ========================== */

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <main className="profile-page">

      {/* =========================
          HEADER
      ========================== */}

      <section className="profile-header">

        <span>MY PROFILE</span>

        <h1>
          Welcome, {user?.name || "Foodie"} 👋
        </h1>

        <p>
          Manage your account, orders, addresses and preferences.
        </p>

      </section>

      {/* =========================
          PROFILE LAYOUT
      ========================== */}

      <section className="profile-layout">

        {/* =========================
            PROFILE CARD
        ========================== */}

        <div className="profile-card">

          <div className="profile-avatar">
            <FiUser />
          </div>

          {!isEditing ? (

            <>
              <h2>
                {user?.name || "FoodHub User"}
              </h2>

              <p>
                {user?.email || "user@foodhub.com"}
              </p>

              <button onClick={handleEdit}>
                <FiEdit2 />
                Edit Profile
              </button>

              <button
                className="profile-logout"
                onClick={handleLogout}
              >
                <FiLogOut />
                Logout
              </button>
            </>

          ) : (

            <form
              className="profile-edit-form"
              onSubmit={handleUpdateProfile}
            >

              <label>Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />

              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />

              <div className="profile-edit-actions">

                <button
                  type="submit"
                  disabled={loading}
                >
                  <FiSave />

                  {loading
                    ? "Saving..."
                    : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  <FiX />
                  Cancel
                </button>

              </div>

            </form>

          )}

          {/* =========================
              SUCCESS MESSAGE
          ========================== */}

          {message && (
            <p className="profile-success">
              {message}
            </p>
          )}

          {/* =========================
              ERROR MESSAGE
          ========================== */}

          {error && (
            <p className="profile-error">
              {error}
            </p>
          )}

        </div>

        {/* =========================
            PROFILE DASHBOARD
        ========================== */}

        <div className="profile-dashboard">

          {/* TOTAL ORDERS */}

          <div
            className="profile-stat"
            onClick={() => navigate("/orders")}
            role="button"
            tabIndex={0}
          >
            <FiShoppingBag />

            <h3>
              {orders.length}
            </h3>

            <p>
              Total Orders
            </p>

          </div>

          {/* WISHLIST */}

          <div
            className="profile-stat"
            onClick={() => navigate("/wishlist")}
            role="button"
            tabIndex={0}
          >

            <FiHeart />

            <h3>
              {wishlist.length}
            </h3>

            <p>
              Wishlist Items
            </p>

          </div>

          {/* SAVED ADDRESS */}

          <div className="profile-stat">

            <FiMapPin />

            <h3>
              1
            </h3>

            <p>
              Saved Address
            </p>

          </div>

          {/* =========================
              ACCOUNT DETAILS
          ========================== */}

          <div className="profile-info">

            <h2>
              Account Details
            </h2>

            <div>
              <FiUser />

              <span>
                {user?.name || "FoodHub User"}
              </span>
            </div>

            <div>
              <FiMail />

              <span>
                {user?.email || "user@foodhub.com"}
              </span>
            </div>

            <div>
              <FiMapPin />

              <span>
                Indore, India
              </span>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Profile;