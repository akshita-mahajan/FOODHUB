import "./Restaurants.css";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { restaurants } from "../../data/restaurantData";
import { FiSearch, FiHeart, FiSliders } from "react-icons/fi";

function Restaurants() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Indian", "Italian", "Fast Food", "Free Delivery", "Top Rated"];

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.cuisine.toLowerCase().includes(search.toLowerCase()) ||
        item.type.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        activeFilter === "All" ||
        item.type === activeFilter ||
        (activeFilter === "Free Delivery" && item.delivery.toLowerCase().includes("free")) ||
        (activeFilter === "Top Rated" && item.rating >= 4.8);

      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  return (
    <main className="restaurants-page">
      <section className="restaurants-hero">
        <div className="restaurants-hero-content">
          <span>PREMIUM RESTAURANTS</span>
          <h1>Order from the best places near you.</h1>
          <p>
            Discover top-rated restaurants, exclusive discounts, quick delivery,
            and premium FoodHub partners.
          </p>

          <div className="restaurant-search">
            <FiSearch />
            <input
              placeholder="Search restaurants, cuisines, dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button>
              <FiSliders /> Filters
            </button>
          </div>
        </div>
      </section>

      <section className="restaurant-filters">
        {filters.map((item) => (
          <button
            key={item}
            className={activeFilter === item ? "active-filter" : ""}
            onClick={() => setActiveFilter(item)}
          >
            {item}
          </button>
        ))}
      </section>

      <section className="restaurants-content">
        <div className="restaurants-heading-row">
          <div>
            <span>TOP PICKS</span>
            <h2>Popular restaurants near you</h2>
          </div>

          <button onClick={() => setActiveFilter("All")}>View all</button>
        </div>

        <div className="restaurants-grid">
          {filteredRestaurants.map((item) => (
            <article
              className="restaurant-list-card"
              key={item.id}
              onClick={() => navigate(`/restaurants/${item.id}`)}
            >
              <div className="restaurant-cover">
                <img src={item.image} alt={item.name} />

                <button className="heart-btn" onClick={(e) => e.stopPropagation()}>
                  <FiHeart />
                </button>

                <span className="offer-badge">{item.offer}</span>
              </div>

              <div className="restaurant-list-content">
                <h3>{item.name}</h3>
                <p>{item.cuisine}</p>

                <div className="restaurant-list-meta">
                  <span>⭐ {item.rating}</span>
                  <span>⏱ {item.time}</span>
                  <span>{item.delivery}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="no-restaurants">
            <h3>No restaurants found</h3>
            <p>Try searching something else.</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Restaurants;