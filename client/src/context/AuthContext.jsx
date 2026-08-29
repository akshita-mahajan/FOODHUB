/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("foodhub_user");

      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error reading stored user:", error);
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  /* =========================
     CHECK LOGIN SESSION
  ========================== */

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("foodhub_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getCurrentUser();

        if (data.user) {
          setUser(data.user);

          localStorage.setItem(
            "foodhub_user",
            JSON.stringify(data.user)
          );
        }
      } catch (error) {
        console.error("Session check failed:", error);

        localStorage.removeItem("foodhub_token");
        localStorage.removeItem("foodhub_user");

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  /* =========================
     LOGIN
  ========================== */

  const login = (userData, token) => {
    localStorage.setItem(
      "foodhub_user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "foodhub_token",
      token
    );

    setUser(userData);
  };

  /* =========================
     LOGOUT
  ========================== */

  const logout = () => {
    localStorage.removeItem("foodhub_user");
    localStorage.removeItem("foodhub_token");

    setUser(null);
  };

  /* =========================
     UPDATE USER
  ========================== */

  const updateUser = (userData) => {
    localStorage.setItem(
      "foodhub_user",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* =========================
   USE AUTH
========================= */

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}