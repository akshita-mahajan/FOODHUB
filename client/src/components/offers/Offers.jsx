import "./Offers.css";
import offer1 from "../../assets/images/offer1.png";
import offer2 from "../../assets/images/offer2.png";

function Offers() {
  return (
    <section className="offers-section">
      <div className="section-title">
        <span>OFFERS</span>
        <h2>Deals made for foodies</h2>
      </div>

      <div className="offers-grid">
        <img src={offer1} />
        <img src={offer2} />
      </div>
    </section>
  );
}

export default Offers;