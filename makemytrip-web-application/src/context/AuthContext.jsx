import { createContext, useContext, useState } from "react";
import { loadFromStorage, saveToStorage } from "../utils/storage";

// DEMO ONLY: users are stored in localStorage with plain-text passwords.
// A real app must use a backend and hashed passwords.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadFromStorage("tripeasy_current_user", null));

  function signup(name, email, password) {
    const users = loadFromStorage("tripeasy_users", []);
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { ok: false, error: "An account with this email already exists." };
    }
    users.push({ name, email, password });
    saveToStorage("tripeasy_users", users);

    const currentUser = { name, email };
    setUser(currentUser);
    saveToStorage("tripeasy_current_user", currentUser);
    return { ok: true };
  }

  function login(email, password) {
    const users = loadFromStorage("tripeasy_users", []);
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) {
      return { ok: false, error: "Wrong email or password." };
    }
    const currentUser = { name: found.name, email: found.email };
    setUser(currentUser);
    saveToStorage("tripeasy_current_user", currentUser);
    return { ok: true };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("tripeasy_current_user");
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
