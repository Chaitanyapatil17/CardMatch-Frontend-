import axios from "axios";

const API = axios.create({
  baseURL: "https://cardmatch-backend-1.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ===============================
// Auth APIs
// ===============================
export const loginUser = (data) =>
  API.post("/auth/login", data);

export const signupUser = (data) =>
  API.post("/auth/signup", data);

// ===============================
// History API
// ===============================
export const getHistory = () =>
  API.get("/history");

// Add other APIs here...
export default API;