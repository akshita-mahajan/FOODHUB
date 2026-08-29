import "./FoodCard.css";
import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

function FoodCard({ item }) {
  const {
    cartItems,
    addToCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  const [isWishlisted, setIsWishlisted] = useState(() => {
    const savedWishlist =
      JSON.parse(
        localStorage.getItem("foodhub_wishlist")
      ) || [];

    return savedWishlist.some(
      (wishlistItem) => wishlistItem.id === item.id
    );
  });

  const cartItem = cartItems.find(
    (i) => i.id === item.id
  );

  /* =========================
     TOGGLE WISHLIST
  ========================== */

  const handleWishlist = () => {
    const savedWishlist =
      JSON.parse(
        localStorage.getItem("foodhub_wishlist")
      ) || [];

    if (isWishlisted) {
      const updatedWishlist =
        savedWishlist.filter(
          (wishlistItem) =>
            wishlistItem.id !== item.id
        );

      localStorage.setItem(
        "foodhub_wishlist",
        JSON.stringify(updatedWishlist)
      );

      setIsWishlisted(false);
    } else {
      const updatedWishlist = [
        ...savedWishlist,
        item,
      ];

      localStorage.setItem(
        "foodhub_wishlist",
        JSON.stringify(updatedWishlist)
      );

      setIsWishlisted(true);
    }
  };

  return (
    <div className="food-card">

      {/* =========================
          TOP SECTION
      ========================== */}

      <div className="food-top">

        <span>
          {item.category}
        </span>

        <div className="food-card-actions">

          <strong>
            ⭐ {item.rating}
          </strong>

          <button
            type="button"
            className={`wishlist-btn ${
              isWishlisted ? "active" : ""
            }`}
            onClick={handleWishlist}
            aria-label={
              isWishlisted
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
          >
            <FiHeart
              fill={
                isWishlisted
                  ? "currentColor"
                  : "none"
              }
            />
          </button>

        </div>

      </div>

      {/* =========================
          FOOD IMAGE
      ========================== */}

      <div className="food-img-box">

        <img
          src={item.image}
          alt={item.name}
        />

      </div>

      {/* =========================
          FOOD NAME
      ========================== */}

      <h3>
        {item.name}
      </h3>

      {/* =========================
          FOOD INFO
      ========================== */}

      <div className="food-info">

        <p>
          ⏱ {item.time}
        </p>

        <h4>
          ₹{item.price}
        </h4>

      </div>

      {/* =========================
          CART CONTROLS
      ========================== */}

      {!cartItem ? (

        <button
          type="button"
          className="add-btn"
          onClick={() => addToCart(item)}
        >
          Add to Cart
        </button>

      ) : (

        <div className="quantity-box">

          <button
            type="button"
            onClick={() =>
              decreaseQty(item.id)
            }
          >
            -
          </button>

          <span>
            {cartItem.quantity}
          </span>

          <button
            type="button"
            onClick={() =>
              increaseQty(item.id)
            }
          >
            +
          </button>

        </div>

      )}

    </div>
  );
}

export default FoodCard;