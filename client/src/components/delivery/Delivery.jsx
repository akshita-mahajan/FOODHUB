import "./Delivery.css";
import deliveryBoy from "../../assets/images/delivery-boy.png";
import steps from "../../assets/images/steps-illustration.png";

function Delivery() {
  return (
    <section className="delivery-section" id="delivery">
      <div className="delivery-image">
        <img src={deliveryBoy} />
      </div>

      <div className="delivery-content">
        <span>FAST DELIVERY</span>
        <h2>Track your food from kitchen to doorstep.</h2>
        <p>
          FoodHub gives real-time updates, reliable riders, delivery status,
          and smooth order tracking.
        </p>

        <img className="steps-img" src={steps} />

        <div className="delivery-points">
          <div><b>01</b><p>Choose your favorite food</p></div>
          <div><b>02</b><p>Restaurant prepares it fresh</p></div>
          <div><b>03</b><p>Track rider live</p></div>
        </div>
      </div>
    </section>
  );
}

export default Delivery;