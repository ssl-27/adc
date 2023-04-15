import axios from "axios";

const cnAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

export default cnAxios;
