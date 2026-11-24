import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container section narrow">
      <h1>404 - Page not found</h1>
      <p className="muted">The page you are looking for does not exist.</p>
      <Link to="/" className="btn">Go home</Link>
    </div>
  );
}

export default NotFound;
