import axios from "axios";

const API = axios.create({
  baseURL: "https://cardmatch-5dpg.onrender.com/api",
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth
export const loginUser = (data) =>
  API.post("/auth/login", data);

export const signupUser = (data) =>
  API.post("/auth/signup", data);

// History
export const getHistory = () =>
  API.get("/history");

// etc...