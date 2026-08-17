import "./Checkout.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    subtotal,
    deliveryFee,
    gst,
    total,
    clearCart,
  } = useCart();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "Indore",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      /*
       * Get the currently logged-in user.
       * Your AuthContext should already store this.
       */
      const storedUser = localStorage.getItem("foodhub_user");

      if (!storedUser) {
        setError("Please login before placing your order.");
        setLoading(false);
        return;
      }

      const user = JSON.parse(storedUser);

      /*
       * Convert cart items into the structure
       * expected by our MongoDB Order model.
       */
      const orderItems = cartItems.map((item) => ({
        foodId: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      }));

      const orderData = {
        user: user.id || user._id,

        items: orderItems,

        deliveryAddress: {
          fullName: address.name,
          phone: address.phone,
          street: address.street,
          city: address.city,
          pincode: address.pincode,
        },

        paymentMethod,

        paymentStatus: "Pending",

        subtotal,

        deliveryFee,

        tax: gst,

        totalAmount: total,
      };

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to place order"
        );
      }

      console.log("Order created:", data.order);

      /*
       * Clear cart only after the backend
       * successfully creates the order.
       */
      clearCart();

      /*
       * Save the newly created order temporarily
       * for the existing Orders page.
       *
       * We'll replace this with GET /api/orders
       * in the next step.
       */
      const previousOrders =
        JSON.parse(
          localStorage.getItem("foodhub_orders")
        ) || [];

      const newOrder = {
        ...data.order,
        id: data.order._id,
        address: data.order.deliveryAddress,
        gst: data.order.tax,
        total: data.order.totalAmount,
        status: data.order.orderStatus,
        date: new Date(
          data.order.createdAt
        ).toLocaleDateString(),
      };

      localStorage.setItem(
        "foodhub_orders",
        JSON.stringify([
          newOrder,
          ...previousOrders,
        ])
      );

      navigate("/orders");
    } catch (err) {
      console.error("Order placement error:", err);

      setError(
        err.message ||
          "Something went wrong while placing your order."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="checkout-page">
      <section className="checkout-header">
        <span>CHECKOUT</span>

        <h1>Complete your order</h1>

        <p>
          Add delivery details and confirm your
          FoodHub order.
        </p>
      </section>

      <section className="checkout-layout">

        {/* =========================
            CHECKOUT FORM
        ========================== */}

        <form
          className="checkout-form"
          onSubmit={placeOrder}
        >
          <h2>Delivery Address</h2>

          <label>Full Name</label>

          <input
            name="name"
            value={address.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <label>Phone Number</label>

          <input
            name="phone"
            type="tel"
            value={address.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />

          <label>Street Address</label>

          <textarea
            name="street"
            value={address.street}
            onChange={handleChange}
            placeholder="House no., street, area..."
            required
          />

          <label>City</label>

          <input
            name="city"
            value={address.city}
            onChange={handleChange}
            placeholder="City"
            required
          />

          <label>Pincode</label>

          <input
            name="pincode"
            value={address.pincode}
            onChange={handleChange}
            placeholder="6-digit pincode"
            required
          />

          <h2>Payment Method</h2>

          <div className="payment-box">

            <label>
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />

              Cash on Delivery
            </label>

            <label>
              <input
                type="radio"
                name="payment"
                value="UPI"
                checked={paymentMethod === "UPI"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />

              UPI / Card
            </label>

          </div>

          {/* ERROR */}

          {error && (
            <div className="checkout-error">
              {error}
            </div>
          )}

          {/* PLACE ORDER */}

          <button
            type="submit"
            disabled={
              cartItems.length === 0 ||
              loading
            }
          >
            {loading
              ? "Placing Order..."
              : "Place Order"}
          </button>

        </form>

        {/* =========================
            ORDER SUMMARY
        ========================== */}

        <aside className="checkout-summary">

          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div
              className="checkout-item"
              key={item.id}
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <b>
                ₹{item.price * item.quantity}
              </b>
            </div>
          ))}

          <hr />

          <div>
            <span>Subtotal</span>
            <b>₹{subtotal}</b>
          </div>

          <div>
            <span>Delivery Fee</span>

            <b>
              {deliveryFee === 0
                ? "Free"
                : `₹${deliveryFee}`}
            </b>
          </div>

          <div>
            <span>GST</span>
            <b>₹{gst}</b>
          </div>

          <hr />

          <div className="checkout-total">
            <span>Total</span>
            <b>₹{total}</b>
          </div>

        </aside>

      </section>
    </main>
  );
}

export default Checkout;