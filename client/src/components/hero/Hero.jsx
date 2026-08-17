import "./Hero.css";
import { motion } from "framer-motion";
import burger from "../../assets/images/hero-burger.png";
import pizza from "../../assets/images/hero-pizza.png";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-left">
        <motion.div className="hero-badge" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          🔥 Premium Food Delivery Experience
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          Food that feels <br />
          like a <span>celebration.</span>
        </motion.h1>

        <p>
          Discover premium restaurants, trending dishes, live delivery tracking,
          and exclusive FoodHub offers in one beautiful platform.
        </p>

        <div className="hero-search">
          <input placeholder="Search burger, pizza, biryani..." />
          <button>Explore Menu</button>
        </div>

        <div className="hero-stats">
          <div><h3>25K+</h3><p>Happy Users</p></div>
          <div><h3>700+</h3><p>Restaurants</p></div>
          <div><h3>4.9</h3><p>Rating</p></div>
        </div>
      </div>

      <motion.div className="hero-right" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
        <div className="hero-glow"></div>
        <img src={burger} className="hero-main-img" />
        <img src={pizza} className="hero-pizza-img" />

        <div className="floating-card card-one">⭐ 4.9 Rating</div>
        <div className="floating-card card-two">🚴 30 min Delivery</div>
        <div className="floating-card card-three">🎁 50% OFF</div>
      </motion.div>
    </section>
  );
}

export default Hero;