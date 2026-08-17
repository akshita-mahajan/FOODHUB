import "./MenuSection.css";
import FoodCard from "./FoodCard";
import { foodItems } from "../../data/foodData";

function MenuSection() {
  return (
    <section className="menu-section" id="menu">
      <div className="section-title">
        <span>POPULAR MENU</span>
        <h2>Best selling dishes</h2>
        <p>Freshly prepared meals from top restaurants near you.</p>
      </div>

      <div className="food-grid">
        {foodItems.map((item) => (
          <FoodCard item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}

export default MenuSection;