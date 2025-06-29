import api from "@/lib/axios";
import { editProfileSchema } from "@/schemas/profileSchema";
import { IProfileGetResponse, IProfilePutResponse } from "@/types/profile";
import { isAxiosError } from "axios";

export async function getProfile() {
  try {
    const response = await api.get<IProfileGetResponse>(`/profile`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "حدث خطأ ما في الحصول على بيانات الملف الشخصي",
      );
    }
    throw error;
  }
}
export async function putProfile(data: editProfileSchema) {
  try {
    const response = await api.put<IProfilePutResponse>(`/profile`, data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "حدث خطأ ما في تحديث الملف الشخصي",
      );
    }
    throw error;
  }
}
