import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 20000,
});

export const attachToken = (token: string) => {
  instance.interceptors.request.use(
    (config) => {
      const clientSide = typeof window !== "undefined";
      if (clientSide) {
        console.log("client");
        console.log(token);
      }
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default instance;
