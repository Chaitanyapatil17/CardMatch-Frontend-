import axios from "axios";

/**
 * Production Setup:
 * - On Vercel, set VITE_API_URL = https://cardmatch-5dpg.onrender.com/api
 * - For local development, it falls back to localhost
 */

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",
  withCredentials: true,
});

// ===============================
// Attach JWT Token Automatically
// ===============================
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// ===============================
// Authentication APIs
// ===============================
export const loginUser = (formData) =>
  API.post("/auth/login", formData);

export const signupUser = (formData) =>
  API.post("/auth/signup", formData);

// ===============================
// Recommendation APIs
// ===============================
export const recommendCards = (userData) =>
  API.post("/recommend/analyze", userData);

// ===============================
// History APIs (FIXED)
// ===============================
export const getHistory = () =>
  API.get("/history");

// ===============================
// Card APIs
// ===============================
export const getCardDetails = (id) =>
  API.get(`/cards/${id}`);

export const getAllCards = () =>
  API.get("/cards");

// Compare multiple cards
export const compareCards = (cardIds) =>
  API.post("/cards/compare", { cardIds });

// ===============================
// Favorites APIs
// ===============================
export const addFavorite = (cardId) =>
  API.post("/favorites", { cardId });

export const removeFavorite = (cardId) =>
  API.delete(`/favorites/${cardId}`);

export const getFavorites = () =>
  API.get("/favorites");

export default API;