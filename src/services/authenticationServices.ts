import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function login(data: {
  email: string;
  password: string;
  rememberMe: boolean;
}) {
  try {
    const response = await api.post<loginResponse>(`/auth/login`, data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error);
      throw new Error(error.response?.data || "حدث خطأ ما في تسجيل الدخول");
    }
    throw error;
  }
}
