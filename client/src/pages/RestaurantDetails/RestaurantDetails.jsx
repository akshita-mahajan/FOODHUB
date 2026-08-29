import "./RestaurantDetails.css";
import { useParams } from "react-router-dom";
import { restaurants } from "../../data/restaurantData";
import { foodItems } from "../../data/foodData";
import FoodCard from "../../components/menu/FoodCard";

function RestaurantDetails() {
  const { id } = useParams();

  const restaurant = restaurants.find(
    (item) => item.id === Number(id)
  );

  if (!restaurant) {
    return (
      <main className="details-error">
        <h2>Restaurant not found</h2>
        <p>
          The restaurant you are looking for does not exist.
        </p>
      </main>
    );
  }

  const restaurantFoodItems = foodItems.filter(
    (item) => item.restaurantId === restaurant.id
  );

  return (
    <main className="restaurant-details">

      {/* =========================
          RESTAURANT HERO
      ========================== */}

      <section className="details-hero">

        <img
          src={restaurant.image}
          alt={restaurant.name}
        />

        <div className="details-overlay">

          <span>
            {restaurant.offer}
          </span>

          <h1>
            {restaurant.name}
          </h1>

          <p>
            {restaurant.cuisine}
          </p>

          <div className="details-meta">

            <b>
              ⭐ {restaurant.rating}
            </b>

            <b>
              ⏱ {restaurant.time}
            </b>

            <b>
              {restaurant.delivery}
            </b>

          </div>

        </div>

      </section>

      {/* =========================
          RESTAURANT INFORMATION
      ========================== */}

      <section className="details-info">

        <div>

          <span>
            ABOUT RESTAURANT
          </span>

          <h2>
            Fresh meals, premium taste, fast delivery.
          </h2>

          <p>
            Explore handpicked dishes from{" "}
            {restaurant.name}. Every meal is
            prepared fresh and delivered with
            FoodHub's premium delivery experience.
          </p>

        </div>

        <div className="info-box">

          <h3>
            Opening Hours
          </h3>

          <p>
            10:00 AM - 11:30 PM
          </p>

          <h3>
            Minimum Order
          </h3>

          <p>
            ₹149
          </p>

        </div>

      </section>

      {/* =========================
          RESTAURANT MENU
      ========================== */}

      <section className="restaurant-menu">

        <div className="section-title">

          <span>
            MENU
          </span>

          <h2>
            Recommended Dishes
          </h2>

          <p>
            Popular items customers love ordering
            from {restaurant.name}.
          </p>

        </div>

        {restaurantFoodItems.length > 0 ? (

          <div className="food-grid">

            {restaurantFoodItems.map((item) => (

              <FoodCard
                key={item.id}
                item={item}
              />

            ))}

          </div>

        ) : (

          <div className="details-error">

            <h3>
              Menu coming soon
            </h3>

            <p>
              This restaurant has no dishes available yet.
            </p>

          </div>

        )}

      </section>

    </main>
  );
}

export default RestaurantDetails;