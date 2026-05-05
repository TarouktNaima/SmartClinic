import axios from "axios";

// إنشاء instance ديال axios
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// جلب token من localStorage
const token = localStorage.getItem("token");

// إلا كان كنديروه فـ headers
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default api;