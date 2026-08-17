import "./Testimonials.css";
import review from "../../assets/images/review-card.png";

function Testimonials() {
  return (
    <section className="reviews-section">
      <div className="section-title">
        <span>REVIEWS</span>
        <h2>Loved by customers</h2>
      </div>

      <div className="reviews-grid">
        <div className="review-text-card">
          <p>“FoodHub looks premium and feels super smooth. The food discovery experience is amazing.”</p>
          <h4>Akshita Mahajan</h4>
          <span>⭐ ⭐ ⭐ ⭐ ⭐</span>
        </div>

        <img src={review} />

        <div className="review-text-card">
          <p>“Fast delivery, beautiful interface and great food options. It feels like a real startup product.”</p>
          <h4>Riya Sharma</h4>
          <span>⭐ ⭐ ⭐ ⭐ ⭐</span>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;