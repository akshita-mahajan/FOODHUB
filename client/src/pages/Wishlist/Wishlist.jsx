import "./Wishlist.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiHeart, FiTrash2 } from "react-icons/fi";
import FoodCard from "../../components/menu/FoodCard";

function Wishlist() {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState(() => {
    return (
      JSON.parse(
        localStorage.getItem("foodhub_wishlist")
      ) || []
    );
  });

  /* =========================
     REMOVE FROM WISHLIST
  ========================== */

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.id !== id
    );

    localStorage.setItem(
      "foodhub_wishlist",
      JSON.stringify(updatedWishlist)
    );

    setWishlist(updatedWishlist);
  };

  return (
    <main className="wishlist-page">

      {/* =========================
          HEADER
      ========================== */}

      <section className="wishlist-header">
        <span>WISHLIST</span>

        <h1>
          Your favorite dishes
        </h1>

        <p>
          Save dishes you love and order them anytime.
        </p>
      </section>

      {/* =========================
          WISHLIST CONTENT
      ========================== */}

      <section className="wishlist-content">

        {wishlist.length > 0 ? (

          <div className="wishlist-grid">

            {wishlist.map((item) => (

              <div
                className="wishlist-item"
                key={item.id}
              >

                <FoodCard item={item} />

                <button
                  type="button"
                  className="wishlist-remove"
                  onClick={() =>
                    removeFromWishlist(item.id)
                  }
                >
                  <FiTrash2 />
                  Remove
                </button>

              </div>

            ))}

          </div>

        ) : (

          <div className="wishlist-empty">

            <FiHeart />

            <h2>
              No wishlist items yet
            </h2>

            <p>
              Start exploring dishes and save your favorites.
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

export default Wishlist;