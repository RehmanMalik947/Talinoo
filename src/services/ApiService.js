// src/services/ApiService.js
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_BASE_URL || "https://api.eversols.com/api/";

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Auto attach token if exists
    this.api.interceptors.request.use((config) => {
      const token = Cookies.get("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Example login
  login(data) {
    return this.api.post("admin/login", data);
  }

  // Example get request
  get(path, params = {}) {
    return this.api.get(path, { params });
  }

  post(path, data) {
    return this.api.post(path, data);
  }

  put(path, data) {
    return this.api.put(path, data);
  }

  delete(path) {
    return this.api.delete(path);
  }
}

export default new ApiService();
