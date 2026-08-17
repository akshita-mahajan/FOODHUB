import "./Wishlist.css";
import { useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { foodItems } from "../../data/foodData";
import FoodCard from "../../components/menu/FoodCard";

function Wishlist() {
  const navigate = useNavigate();

  return (
    <main className="wishlist-page">
      <section className="wishlist-header">
        <span>WISHLIST</span>
        <h1>Your favorite dishes</h1>
        <p>Save dishes you love and order them anytime.</p>
      </section>

      <section className="wishlist-content">
        {foodItems.length > 0 ? (
          <div className="wishlist-grid">
            {foodItems.slice(0, 4).map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="wishlist-empty">
            <FiHeart />
            <h2>No wishlist items yet</h2>
            <p>Start exploring dishes and save your favorites.</p>
            <button onClick={() => navigate("/restaurants")}>
              Explore Restaurants
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Wishlist;