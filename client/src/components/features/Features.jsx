import "./Features.css";
import {
  FiClock,
  FiMapPin,
  FiShield,
  FiGift,
  FiCoffee,
  FiHeadphones,
} from "react-icons/fi";

function Features() {
  const items = [
    {
      icon: <FiClock />,
      title: "Fast Delivery",
      text: "Hot and fresh food delivered to your doorstep in no time.",
    },
    {
      icon: <FiMapPin />,
      title: "Live Tracking",
      text: "Track your order in real-time from kitchen to doorstep.",
    },
    {
      icon: <FiShield />,
      title: "Secure Payments",
      text: "Safe and secure transactions with multiple payment options.",
    },
    {
      icon: <FiGift />,
      title: "Daily Offers",
      text: "Exclusive discounts, deals and rewards for food lovers.",
    },
    {
      icon: <FiCoffee />,
      title: "Fresh & Quality Food",
      text: "Carefully selected restaurants serving premium quality meals.",
    },
    {
      icon: <FiHeadphones />,
      title: "24×7 Support",
      text: "Friendly customer support available whenever you need help.",
    },
  ];

  return (
    <section className="features-section">
      <div className="section-title">
        <span>WHY CHOOSE FOODHUB</span>
        <h2>Built for better food delivery</h2>
        <p>
          Everything you need for a smooth, premium ordering experience.
        </p>
      </div>

      <div className="features-grid">
        {items.map((item, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{item.icon}</div>

            <h3>{item.title}</h3>

            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;