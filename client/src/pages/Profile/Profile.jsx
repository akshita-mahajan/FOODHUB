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
  FiChevronRight,
  FiTrash2,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../services/authService";
import { restaurants } from "../../data/restaurantData";

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
     RESTAURANT WISHLIST
  ========================== */

  const [restaurantWishlist, setRestaurantWishlist] =
    useState(() => {
      return (
        JSON.parse(
          localStorage.getItem(
            "foodhub_restaurant_wishlist"
          )
        ) || []
      );
    });

  /* =========================
     FOOD WISHLIST
  ========================== */

  const [foodWishlist] = useState(() => {
    return (
      JSON.parse(
        localStorage.getItem("foodhub_wishlist")
      ) || []
    );
  });

  /* =========================
     INPUT CHANGE
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
      setMessage(
        "Profile updated successfully."
      );
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

  /* =========================
     REMOVE RESTAURANT
  ========================== */

  const removeRestaurant = (id) => {
    const updated = restaurantWishlist.filter(
      (item) => item.id !== id
    );

    setRestaurantWishlist(updated);

    localStorage.setItem(
      "foodhub_restaurant_wishlist",
      JSON.stringify(updated)
    );
  };

  /* =========================
     OPEN RESTAURANT
  ========================== */

  const openRestaurant = (id) => {
    navigate(`/restaurants/${id}`);
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
          Manage your account, orders, addresses
          and preferences.
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
                {user?.email ||
                  "user@foodhub.com"}
              </p>

              <button
                type="button"
                onClick={handleEdit}
              >
                <FiEdit2 />
                Edit Profile
              </button>

              <button
                type="button"
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

          {/* SUCCESS */}

          {message && (
            <p className="profile-success">
              {message}
            </p>
          )}

          {/* ERROR */}

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

          {/* ORDERS */}

          <div
            className="profile-stat"
            onClick={() =>
              navigate("/orders")
            }
            role="button"
            tabIndex={0}
          >
            <FiShoppingBag />

            <h3>
              {orders.length}
            </h3>

            <p>Total Orders</p>
          </div>

          {/* FOOD WISHLIST */}

          <div
            className="profile-stat"
            onClick={() =>
              navigate("/wishlist")
            }
            role="button"
            tabIndex={0}
          >
            <FiHeart />

            <h3>
              {foodWishlist.length}
            </h3>

            <p>Wishlist Items</p>
          </div>

          {/* RESTAURANT FAVORITES */}

          <div
            className="profile-stat"
            onClick={() =>
              document
                .getElementById(
                  "saved-restaurants"
                )
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
            role="button"
            tabIndex={0}
          >
            <FiHeart />

            <h3>
              {restaurantWishlist.length}
            </h3>

            <p>Saved Restaurants</p>
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
                {user?.name ||
                  "FoodHub User"}
              </span>
            </div>

            <div>
              <FiMail />

              <span>
                {user?.email ||
                  "user@foodhub.com"}
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

      {/* =========================
          SAVED RESTAURANTS
      ========================== */}

      <section
        className="saved-restaurants"
        id="saved-restaurants"
      >

        <div className="saved-restaurants-header">

          <div>
            <span>
              YOUR FAVORITES
            </span>

            <h2>
              Saved Restaurants
            </h2>

            <p>
              Restaurants you've saved for
              your next order.
            </p>
          </div>

          {restaurantWishlist.length > 0 && (
            <button
              type="button"
              onClick={() =>
                navigate("/restaurants")
              }
            >
              Explore Restaurants
              <FiChevronRight />
            </button>
          )}

        </div>

        {restaurantWishlist.length > 0 ? (

          <div className="saved-restaurants-grid">

            {restaurantWishlist.map(
              (item) => {

                const restaurant =
                  restaurants.find(
                    (restaurantItem) =>
                      restaurantItem.id ===
                      item.id
                  );

                if (!restaurant) {
                  return null;
                }

                return (
                  <article
                    className="saved-restaurant-card"
                    key={restaurant.id}
                  >

                    <div
                      className="saved-restaurant-image"
                      onClick={() =>
                        openRestaurant(
                          restaurant.id
                        )
                      }
                    >

                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                      />

                      <button
                        type="button"
                        className="saved-remove-btn"
                        onClick={(e) => {
                          e.stopPropagation();

                          removeRestaurant(
                            restaurant.id
                          );
                        }}
                        aria-label={`Remove ${restaurant.name}`}
                      >
                        <FiTrash2 />
                      </button>

                    </div>

                    <div className="saved-restaurant-content">

                      <h3>
                        {restaurant.name}
                      </h3>

                      <p>
                        {restaurant.cuisine}
                      </p>

                      <div className="saved-restaurant-meta">

                        <span>
                          ⭐ {restaurant.rating}
                        </span>

                        <span>
                          ⏱ {restaurant.time}
                        </span>

                        <span>
                          {restaurant.delivery}
                        </span>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          openRestaurant(
                            restaurant.id
                          )
                        }
                      >
                        View Restaurant
                        <FiChevronRight />
                      </button>

                    </div>

                  </article>
                );
              }
            )}

          </div>

        ) : (

          /* =========================
             EMPTY STATE
          ========================== */

          <div className="saved-restaurants-empty">

            <div>
              <FiHeart />
            </div>

            <h3>
              No saved restaurants yet
            </h3>

            <p>
              Tap the heart on any restaurant
              to save it here.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/restaurants")
              }
            >
              Explore Restaurants
            </button>

          </div>

        )}

      </section>

    </main>
  );
}

export default Profile;