import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const result = login(email, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate(redirectTo, { replace: true });
  }

  return (
    <div className="container section auth-box">
      <h1>Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button type="submit" className="btn">Login</button>
      </form>
      <p className="muted">
        New here? <Link to="/signup" state={location.state}>Create an account</Link>
      </p>
    </div>
  );
}

export default Login;
