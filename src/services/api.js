import axios from "axios";

const API = axios.create({
  baseURL: "https://money-manager-backend-94d8.onrender.com/api",
});

export default API;
