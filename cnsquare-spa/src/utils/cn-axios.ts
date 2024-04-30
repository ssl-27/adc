import axios from "axios";

const adcAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

export default adcAxios;
