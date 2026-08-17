import "./Orders.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPackage, FiShoppingBag } from "react-icons/fi";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedUser = localStorage.getItem("foodhub_user");

        if (!storedUser) {
          setError("Please login to view your orders.");
          setLoading(false);
          return;
        }

        const user = JSON.parse(storedUser);
        const userId = user.id || user._id;

        if (!userId) {
          setError("User information is missing.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/orders/user/${userId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch orders");
        }

        setOrders(data.orders || []);
      } catch (err) {
        console.error("Orders fetch error:", err);
        setError(err.message || "Unable to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /* =========================
     LOADING
  ========================== */

  if (loading) {
    return (
      <section className="orders-empty">
        <FiPackage />
        <h1>Loading your orders...</h1>
        <p>Please wait while we fetch your latest orders.</p>
      </section>
    );
  }

  /* =========================
     ERROR
  ========================== */

  if (error) {
    return (
      <section className="orders-empty">
        <FiShoppingBag />
        <h1>Unable to load orders</h1>
        <p>{error}</p>

        <button onClick={() => navigate("/restaurants")}>
          Order Now
        </button>
      </section>
    );
  }

  /* =========================
     EMPTY
  ========================== */

  if (orders.length === 0) {
    return (
      <section className="orders-empty">
        <FiShoppingBag />
        <h1>No orders yet</h1>
        <p>Your placed orders will appear here.</p>

        <button onClick={() => navigate("/restaurants")}>
          Order Now
        </button>
      </section>
    );
  }

  /* =========================
     ORDERS
  ========================== */

  return (
    <main className="orders-page">
      <section className="orders-header">
        <span>MY ORDERS</span>

        <h1>Track your FoodHub orders</h1>

        <p>
          View your recent orders, delivery status and
          order summary.
        </p>
      </section>

      <section className="orders-list">
        {orders.map((order) => (
          <div className="order-card" key={order._id}>
            {/* =========================
                ORDER HEADER
            ========================== */}

            <div className="order-top">
              <div>
                <h3>
                  <FiPackage />

                  Order #
                  {order._id?.slice(-6).toUpperCase()}
                </h3>

                <p>
                  Placed on{" "}
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>

              <span className="order-status">
                {order.orderStatus}
              </span>
            </div>

            {/* =========================
                ITEMS
            ========================== */}

            <div className="order-items">
              {order.items?.map((item, index) => (
                <div
                  className="order-item"
                  key={`${item.foodId}-${index}`}
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>

                  <b>
                    ₹{item.price * item.quantity}
                  </b>
                </div>
              ))}
            </div>

            {/* =========================
                ADDRESS
            ========================== */}

            <div className="order-address">
              <h4>Delivery Address</h4>

              <p>
                {order.deliveryAddress?.fullName},{" "}
                {order.deliveryAddress?.phone}
                <br />

                {order.deliveryAddress?.street},{" "}
                {order.deliveryAddress?.city},{" "}
                {order.deliveryAddress?.pincode}
              </p>
            </div>

            {/* =========================
                PAYMENT
            ========================== */}

            <div className="order-payment">
              <span>
                Payment:{" "}
                <strong>
                  {order.paymentMethod}
                </strong>
              </span>

              <span>
                Status:{" "}
                <strong>
                  {order.paymentStatus}
                </strong>
              </span>
            </div>

            {/* =========================
                BOTTOM
            ========================== */}

            <div className="order-bottom">
              <h3>
                Total: ₹{order.totalAmount}
              </h3>

              <button
                onClick={() =>
                  navigate("/restaurants")
                }
              >
                Reorder
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Orders;