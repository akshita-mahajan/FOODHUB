import "./Footer.css";
import { FiInstagram, FiLinkedin, FiTwitter, FiMail, FiPhone } from "react-icons/fi";

function Footer() {
  return (
    <footer className="premium-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>Food<span>Hub</span></h2>
          <p>India’s premium food delivery experience for modern food lovers.</p>

          <div className="footer-socials">
            <FiInstagram />
            <FiLinkedin />
            <FiTwitter />
          </div>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <a>About</a>
          <a>Careers</a>
          <a>Restaurants</a>
          <a>Blog</a>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <a>Help Center</a>
          <a>FAQs</a>
          <a>Terms</a>
          <a>Privacy</a>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <a><FiMail /> hello@foodhub.com</a>
          <a><FiPhone /> +91 98765 43210</a>
          <a>Indore, India</a>
        </div>
      </div>

      <div className="footer-newsletter">
        <div>
          <h3>Get exclusive food offers</h3>
          <p>Subscribe to receive weekly deals and restaurant updates.</p>
        </div>

        <div className="newsletter-box">
          <input placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 FoodHub. All rights reserved.</p>
        <p>Made with ❤️ for food lovers.</p>
      </div>
    </footer>
  );
}

export default Footer;