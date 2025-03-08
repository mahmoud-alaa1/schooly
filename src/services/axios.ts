import axios from "axios";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 20000,
  withCredentials: true,
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
      redirect("/login");
    }
    return Promise.reject(error);
  }
);

instance.interceptors.request.use(async (config) => {
  const session = await auth();
  console.log("i'm session", session);
  const token = session?.user?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
