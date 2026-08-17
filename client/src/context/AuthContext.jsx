import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("foodhub_user")) || null
  );

  const login = (userData, token) => {
    localStorage.setItem("foodhub_user", JSON.stringify(userData));
    localStorage.setItem("foodhub_token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("foodhub_user");
    localStorage.removeItem("foodhub_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}