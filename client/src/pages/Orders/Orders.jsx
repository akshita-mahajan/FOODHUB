import "./Orders.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiPackage,
  FiShoppingBag,
  FiCheck,
  FiClock,
  FiTruck,
} from "react-icons/fi";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const statusSteps = [
    {
      key: "Placed",
      label: "Order Placed",
      icon: <FiCheck />,
    },
    {
      key: "Accepted",
      label: "Accepted",
      icon: <FiCheck />,
    },
    {
      key: "Preparing",
      label: "Preparing",
      icon: <FiClock />,
    },
    {
      key: "Out For Delivery",
      label: "Out For Delivery",
      icon: <FiTruck />,
    },
    {
      key: "Delivered",
      label: "Delivered",
      icon: <FiCheck />,
    },
  ];

  const getStatusIndex = (status) => {
    return statusSteps.findIndex((step) => step.key === status);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("foodhub_token");

        if (!token) {
          setError("Your session has expired. Please login again.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/orders/my-orders",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.status === 401) {
          localStorage.removeItem("foodhub_token");
          localStorage.removeItem("foodhub_user");

          setError("Your session has expired. Please login again.");
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch orders"
          );
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
        <p>
          Please wait while we fetch your latest orders.
        </p>
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

        <button onClick={() => navigate("/login")}>
          Login Again
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

        <p>
          Your placed orders will appear here.
        </p>

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
        {orders.map((order) => {
          const currentStatusIndex = getStatusIndex(
            order.orderStatus
          );

          return (
            <div
              className="order-card"
              key={order._id}
            >
              {/* =========================
                  ORDER HEADER
              ========================== */}

              <div className="order-top">
                <div>
                  <h3>
                    <FiPackage />

                    Order #
                    {order._id
                      ?.slice(-6)
                      .toUpperCase()}
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
                  ORDER TRACKING
              ========================== */}

              {order.orderStatus !== "Cancelled" && (
                <div className="order-tracking">
                  <h4>Order Tracking</h4>

                  <div className="tracking-steps">
                    {statusSteps.map(
                      (step, index) => {
                        const completed =
                          index <=
                          currentStatusIndex;

                        const active =
                          index ===
                          currentStatusIndex;

                        return (
                          <div
                            className={`tracking-step ${
                              completed
                                ? "completed"
                                : ""
                            } ${
                              active
                                ? "active"
                                : ""
                            }`}
                            key={step.key}
                          >
                            <div className="tracking-icon">
                              {step.icon}
                            </div>

                            <span>
                              {step.label}
                            </span>

                            {index <
                              statusSteps.length -
                                1 && (
                              <div className="tracking-line">
                                <span
                                  className={
                                    index <
                                    currentStatusIndex
                                      ? "filled"
                                      : ""
                                  }
                                />
                              </div>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              )}

              {/* =========================
                  ITEMS
              ========================== */}

              <div className="order-items">
                {order.items?.map(
                  (item, index) => (
                    <div
                      className="order-item"
                      key={`${item.foodId}-${index}`}
                    >
                      <span>
                        {item.name} ×{" "}
                        {item.quantity}
                      </span>

                      <b>
                        ₹
                        {item.price *
                          item.quantity}
                      </b>
                    </div>
                  )
                )}
              </div>

              {/* =========================
                  ADDRESS
              ========================== */}

              <div className="order-address">
                <h4>Delivery Address</h4>

                <p>
                  {
                    order.deliveryAddress
                      ?.fullName
                  }
                  ,{" "}
                  {
                    order.deliveryAddress
                      ?.phone
                  }

                  <br />

                  {
                    order.deliveryAddress
                      ?.street
                  }
                  ,{" "}
                  {
                    order.deliveryAddress
                      ?.city
                  }
                  ,{" "}
                  {
                    order.deliveryAddress
                      ?.pincode
                  }
                </p>
              </div>

              {/* =========================
                  PAYMENT
              ========================== */}

              <div className="order-payment">
                <div className="payment-info">
                  <span>
                    Payment Method
                  </span>

                  <strong>
                    {order.paymentMethod}
                  </strong>
                </div>

                <div className="payment-info">
                  <span>
                    Payment Status
                  </span>

                  <strong>
                    {order.paymentStatus}
                  </strong>
                </div>
              </div>

              {/* =========================
                  BOTTOM
              ========================== */}

              <div className="order-bottom">
                <h3>
                  Total: ₹
                  {order.totalAmount}
                </h3>

                <div className="order-actions">
                  <button
                    className="view-order-btn"
                    onClick={() =>
                      navigate(
                        `/orders/${order._id}`
                      )
                    }
                  >
                    View Details
                  </button>

                  <button
                    onClick={() =>
                      navigate(
                        "/restaurants"
                      )
                    }
                  >
                    Reorder
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default Orders;