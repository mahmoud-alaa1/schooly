import api from "@/lib/axios";
import { IProfileGetResponse } from "@/types/profile";
import { isAxiosError } from "axios";

export async function getProfile() {
  try {
    const response = await api.get<IProfileGetResponse>(`/profile`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error);
      throw new Error(
        error.response?.data || "حدث خطأ ما في الحصول على بيانات الملف الشخصي",
      );
    }
    throw error;
  }
}
