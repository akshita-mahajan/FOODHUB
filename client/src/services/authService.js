import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

/* =========================
   SIGNUP
========================= */

export const signupUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/signup`,
    userData
  );

  return response.data;
};

/* =========================
   LOGIN
========================= */

export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/login`,
    userData
  );

  return response.data;
};

/* =========================
   GET CURRENT USER
========================= */

export const getCurrentUser = async () => {
  const token = localStorage.getItem("foodhub_token");

  const response = await axios.get(
    `${API_URL}/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

/* =========================
   UPDATE PROFILE
========================= */

export const updateProfile = async (userData) => {
  const token = localStorage.getItem("foodhub_token");

  const response = await axios.put(
    `${API_URL}/profile`,
    userData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};