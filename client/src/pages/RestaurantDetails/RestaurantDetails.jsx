import "./RestaurantDetails.css";
import { useParams } from "react-router-dom";
import { restaurants } from "../../data/restaurantData";
import { foodItems } from "../../data/foodData";
import FoodCard from "../../components/menu/FoodCard";

function RestaurantDetails() {
  const { id } = useParams();
  const restaurant = restaurants.find((item) => item.id === Number(id));

  if (!restaurant) {
    return <div className="details-error">Restaurant not found</div>;
  }

  return (
    <main className="restaurant-details">
      <section className="details-hero">
        <img src={restaurant.image} alt={restaurant.name} />

        <div className="details-overlay">
          <span>{restaurant.offer}</span>
          <h1>{restaurant.name}</h1>
          <p>{restaurant.cuisine}</p>

          <div className="details-meta">
            <b>⭐ {restaurant.rating}</b>
            <b>⏱ {restaurant.time}</b>
            <b>{restaurant.delivery}</b>
          </div>
        </div>
      </section>

      <section className="details-info">
        <div>
          <span>ABOUT RESTAURANT</span>
          <h2>Fresh meals, premium taste, fast delivery.</h2>
          <p>
            Explore handpicked dishes from {restaurant.name}. Every meal is
            prepared fresh and delivered with FoodHub’s premium delivery
            experience.
          </p>
        </div>

        <div className="info-box">
          <h3>Opening Hours</h3>
          <p>10:00 AM - 11:30 PM</p>
          <h3>Minimum Order</h3>
          <p>₹149</p>
        </div>
      </section>

      <section className="restaurant-menu">
        <div className="section-title">
          <span>MENU</span>
          <h2>Recommended Dishes</h2>
          <p>Popular items customers love ordering from this restaurant.</p>
        </div>

        <div className="food-grid">
          {foodItems.slice(0, 6).map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default RestaurantDetails;