import axios from "axios";

const baseURL =
  import.meta.env.MODE === "production"
    ? "https://cardmatch-backend-1.onrender.com/api"
    : "http://localhost:5000/api";

const API = axios.create({
  baseURL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const loginUser = (data) =>
  API.post("/auth/login", data);

export const signupUser = (data) =>
  API.post("/auth/signup", data);

export const getHistory = () =>
  API.get("/history");

export default API;