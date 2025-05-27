import axios from "@/lib/axios";
import { isAxiosError } from "axios";

export async function login(data: {
  email: string;
  password: string;
  rememberMe: boolean;
}) {
  try {
    const response = await axios.post<loginResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      data
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error);
      throw new Error(error.response?.data || "حدث خطأ ما في تسجيل الدخول");
    }
    throw error;
  }
}
