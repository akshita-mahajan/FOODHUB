import "./Signup.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { signupUser } from "../../services/authService";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await signupUser(formData);
      setMessage("Account created successfully!");
      setTimeout(() => navigate("/login"), 900);
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="signup-page">
      <div className="signup-card">
        <div className="signup-left">
          <span>JOIN FOODHUB</span>
          <h1>Create your account</h1>
          <p>
            Save favorite meals, track orders, unlock exclusive offers and enjoy
            faster checkout.
          </p>
        </div>

        <form className="signup-form" onSubmit={handleSignup}>
          <h2>Sign Up</h2>

          {message && <p className="signup-message">{message}</p>}

          <label>Full Name</label>
          <div className="input-box">
            <FiUser />
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <label>Email Address</label>
          <div className="input-box">
            <FiMail />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <label>Password</label>
          <div className="input-box">
            <FiLock />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <button className="signup-submit" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="signup-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Signup;