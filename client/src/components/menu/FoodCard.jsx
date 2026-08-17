import "./FoodCard.css";
import { useCart } from "../../context/CartContext";

function FoodCard({ item }) {
  const { cartItems, addToCart, increaseQty, decreaseQty } = useCart();

  const cartItem = cartItems.find((i) => i.id === item.id);

  return (
    <div className="food-card">
      <div className="food-top">
        <span>{item.category}</span>
        <strong>⭐ {item.rating}</strong>
      </div>

      <div className="food-img-box">
        <img src={item.image} alt={item.name} />
      </div>

      <h3>{item.name}</h3>

      <div className="food-info">
        <p>⏱ {item.time}</p>
        <h4>₹{item.price}</h4>
      </div>

      {!cartItem ? (
        <button
          className="add-btn"
          onClick={() => addToCart(item)}
        >
          Add to Cart
        </button>
      ) : (
        <div className="quantity-box">
          <button onClick={() => decreaseQty(item.id)}>-</button>

          <span>{cartItem.quantity}</span>

          <button onClick={() => increaseQty(item.id)}>+</button>
        </div>
      )}
    </div>
  );
}

export default FoodCard;