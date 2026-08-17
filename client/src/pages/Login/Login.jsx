import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = await loginUser(formData);

      login(data.user, data.token);
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <div className="login-left">
          <span>WELCOME BACK</span>
          <h1>Login to FoodHub</h1>
          <p>
            Track your orders, reorder your favorite meals and enjoy exclusive
            FoodHub offers.
          </p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>

          {message && <p className="login-message">{message}</p>}

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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <div className="login-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a>Forgot Password?</a>
          </div>

          <button className="login-submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="login-switch">
            New to FoodHub? <Link to="/signup">Create account</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;