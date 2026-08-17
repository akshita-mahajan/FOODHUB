import "./Categories.css";
import { categories } from "../../data/foodData";

function Categories() {
  return (
    <section className="categories" id="categories">
      <div className="section-title">
        <span>EXPLORE</span>
        <h2>What are you craving today?</h2>
        <p>Choose from premium categories designed for every mood.</p>
      </div>

      <div className="category-grid">
        {categories.map((cat) => (
          <div className="category-card" key={cat.id}>
            <img src={cat.image} alt={cat.name} />
            <h3>{cat.name}</h3>
            <p>120+ options</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;