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
      throw new Error(
        error.response?.data?.message || "حدث خطأ ما في الحصول على الملف",
      );
    }
    throw error;
  }
}
export async function postFile(
  formFile: FormData,
  onProgress?: (progress: number) => void,
) {
  try {
    const response = await api.post<IUploadPostResponse>(`/upload`, formFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          onProgress?.(progress);
        }
      },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "حدث خطأ ما في رفع الملف",
      );
    }
    throw error;
  }
}
