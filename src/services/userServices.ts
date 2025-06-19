import api from "@/lib/axios";
import { EGender, EROLES } from "@/types/enums";
import { isAxiosError } from "axios";

export async function getInfo(id: string) {
  try {
    const response = await api.get<{
      data: {
        gender: EGender;
        id: string;
        name: string;
        profilePictureUrl: string;
        role: EROLES;
      };
    }>(`/user/info/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error);
      throw new Error(
        error.response?.data || "حدث خطأ ما في الحصول على بيانات المستخدم",
      );
    }
    throw error;
  }
}
