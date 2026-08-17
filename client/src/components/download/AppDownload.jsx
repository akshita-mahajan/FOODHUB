import "./AppDownload.css";
import phone from "../../assets/images/phone-mockup.png";

function AppDownload() {
  return (
    <section className="app-download">
      <div>
        <span>DOWNLOAD APP</span>
        <h2>FoodHub in your pocket.</h2>
        <p>
          Order faster, save your favorite meals, get exclusive offers,
          and track everything from our mobile app.
        </p>

        <div className="app-buttons">
          <button>▶ Google Play</button>
          <button> App Store</button>
        </div>
      </div>

      <img src={phone} />
    </section>
  );
}

export default AppDownload;