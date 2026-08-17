import "./NotFound.css";
import { useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="notfound-page">
      <div className="notfound-card">
        <h1>404</h1>
        <h2>Oops! Page not found</h2>
        <p>The page you are looking for doesn’t exist or has been moved.</p>

        <button onClick={() => navigate("/")}>
          <FiHome />
          Back to Home
        </button>
      </div>
    </main>
  );
}

export default NotFound;