import "./Contact.css";
import { FiMail, FiPhone, FiMapPin, FiMessageCircle } from "react-icons/fi";

function Contact() {
  return (
    <main className="contact-page">
      <section className="contact-header">
        <span>CONTACT US</span>
        <h1>We’re here to help</h1>
        <p>Need support, partnership, or order help? Reach out anytime.</p>
      </section>

      <section className="contact-layout">
        <div className="contact-info">
          <div className="contact-card">
            <FiMail />
            <h3>Email</h3>
            <p>hello@foodhub.com</p>
          </div>

          <div className="contact-card">
            <FiPhone />
            <h3>Phone</h3>
            <p>+91 98765 43210</p>
          </div>

          <div className="contact-card">
            <FiMapPin />
            <h3>Location</h3>
            <p>Indore, India</p>
          </div>

          <div className="contact-card">
            <FiMessageCircle />
            <h3>Support</h3>
            <p>24×7 customer help</p>
          </div>
        </div>

        <form className="contact-form">
          <h2>Send a message</h2>

          <label>Name</label>
          <input placeholder="Enter your name" />

          <label>Email</label>
          <input placeholder="Enter your email" />

          <label>Message</label>
          <textarea placeholder="How can we help you?" />

          <button type="button">Send Message</button>
        </form>
      </section>
    </main>
  );
}

export default Contact;