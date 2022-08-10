import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = window.localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = token;
  }

  return config;
});

export default instance;
