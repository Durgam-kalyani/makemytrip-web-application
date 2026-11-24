import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (name.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    const result = signup(name.trim(), email.trim(), password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate(redirectTo, { replace: true });
  }

  return (
    <div className="container section auth-box">
      <h1>Create account</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input id="name" type="text" value={name}
            onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="password">Password (min 6 characters)</label>
          <input id="password" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button type="submit" className="btn">Sign up</button>
      </form>
      <p className="muted">
        Already registered? <Link to="/login" state={location.state}>Login</Link>
      </p>
    </div>
  );
}

export default Signup;
