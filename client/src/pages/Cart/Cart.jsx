import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeItem,
    subtotal,
    deliveryFee,
    gst,
    total,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <section className="cart-empty">
        <FiShoppingBag />
        <h1>Your cart is empty</h1>
        <p>Add delicious food items and they’ll appear here.</p>
        <button onClick={() => navigate("/restaurants")}>Explore Restaurants</button>
      </section>
    );
  }

  return (
    <main className="cart-page">
      <section className="cart-header">
        <span>YOUR CART</span>
        <h1>Review your order</h1>
        <p>Manage quantities, remove items and proceed to checkout.</p>
      </section>

      <section className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-info">
                <h3>{item.name}</h3>
                <p>{item.category}</p>
                <strong>₹{item.price}</strong>
              </div>

              <div className="qty-box">
                <button onClick={() => decreaseQty(item.id)}>
                  <FiMinus />
                </button>

                <span>{item.quantity}</span>

                <button onClick={() => increaseQty(item.id)}>
                  <FiPlus />
                </button>
              </div>

              <h3 className="item-total">₹{item.price * item.quantity}</h3>

              <button className="remove-btn" onClick={() => removeItem(item.id)}>
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div>
            <span>Subtotal</span>
            <b>₹{subtotal}</b>
          </div>

          <div>
            <span>Delivery Fee</span>
            <b>{deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}</b>
          </div>

          <div>
            <span>GST</span>
            <b>₹{gst}</b>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <b>₹{total}</b>
          </div>

          <button onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
        </aside>
      </section>
    </main>
  );
}

export default Cart;