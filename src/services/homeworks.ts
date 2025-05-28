import api from "@/lib/axios";
import { HOMEWORKS_PER_PAGE } from "@/lib/constants";
import { isAxiosError } from "axios";

export async function getHomeworks({
  Page,
  PageSize = HOMEWORKS_PER_PAGE,
  ClassRoomId,
}: {
  Page?: string | number;
  PageSize?: string | number;
  ClassRoomId?: string;
}) {
  try {
    const response = await api.get(`/homework/active`, {
      params: {
        Page,
        PageSize,
        ClassRoomId,
      },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error);
      throw new Error(
        error.response?.data || "حدث خطأ ما في الحصول على الحصص القادمة",
      );
    }
    throw error;
  }
}

export async function deleteHomework(id: number | string) {
  try {
    const response = await api.delete(`/homework/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error);
      throw new Error(error.response?.data || "حدث خطأ ما في حذف الواجب");
    }
    throw error;
  }
}

export async function createHomework(data: ILessonPostData) {
  try {
    const response = await api.post(`/post`, data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error);
      throw new Error(error.response?.data || "حدث خطأ ما في انشاء الحصة");
    }
    throw error;
  }
}
