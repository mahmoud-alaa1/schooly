import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function getFile({ fileUrl }: { fileUrl: string }) {
  try {
    const response = await api.get(`/upload/${fileUrl}`, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error);
      throw new Error(
        error.response?.data || "حدث خطأ ما في الحصول على المنشورات",
      );
    }
    throw error;
  }
}
