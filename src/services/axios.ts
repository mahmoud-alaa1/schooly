import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 20000,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // handle 401 error
      console.log("unauthorized");

      // redirect to login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export default instance;
