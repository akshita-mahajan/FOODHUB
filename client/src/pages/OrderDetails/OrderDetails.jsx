import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiPackage } from "react-icons/fi";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/orders/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch order");
        }

        setOrder(data);
      } catch (err) {
        console.error("Order details error:", err);
        setError(err.message || "Unable to load order.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <section className="orders-empty">
        <FiPackage />
        <h1>Loading order...</h1>
        <p>Please wait while we fetch your order details.</p>
      </section>
    );
  }

  if (error || !order) {
    return (
      <section className="orders-empty">
        <FiPackage />
        <h1>Unable to load order</h1>
        <p>{error || "Order not found."}</p>

        <button onClick={() => navigate("/orders")}>
          Back to Orders
        </button>
      </section>
    );
  }

  return (
    <main className="orders-page">
      <section className="orders-header">
        <button onClick={() => navigate("/orders")}>
          <FiArrowLeft /> Back to Orders
        </button>

        <span>ORDER DETAILS</span>

        <h1>
          Order #{order._id?.slice(-6).toUpperCase()}
        </h1>

        <p>
          Placed on{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </section>

      <section className="order-card">
        <div className="order-top">
          <div>
            <h3>
              <FiPackage /> Current Status
            </h3>
          </div>

          <span className="order-status">
            {order.orderStatus}
          </span>
        </div>

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

        <div className="order-payment">
          <span>
            Payment:{" "}
            <strong>{order.paymentMethod}</strong>
          </span>

          <span>
            Payment Status:{" "}
            <strong>{order.paymentStatus}</strong>
          </span>
        </div>

        <div className="order-bottom">
          <h3>Total: ₹{order.totalAmount}</h3>
        </div>
      </section>
    </main>
  );
}

export default OrderDetails;