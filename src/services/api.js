import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

/* ========================
   AUTH
======================== */
export const loginUser = (data) =>
  API.post("/auth/login", data);

export const signupUser = (data) =>
  API.post("/auth/signup", data);

/* ========================
   RECOMMENDATION
======================== */
export const recommendCards = (data) =>
  API.post("/recommend/analyze", data);

/* ========================
   HISTORY
======================== */
export const getHistory = () =>
  API.get("/history");

/* ========================
   CARDS
======================== */
export const getCardDetails = (id) =>
  API.get(`/cards/${id}`);

export const getAllCards = () =>
  API.get("/cards");

export const compareCards = (cardIds) =>
  API.post("/cards/compare", { cardIds });

/* ========================
   FAVORITES
======================== */
export const addFavorite = (cardId) =>
  API.post("/favorites", { cardId });

export const removeFavorite = (cardId) =>
  API.delete(`/favorites/${cardId}`);

export const getFavorites = () =>
  API.get("/favorites");

export default API;