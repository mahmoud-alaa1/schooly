import api from "@/lib/axios";
import { UPCOMING_LESSONS_PER_PAGE } from "@/lib/constants";
import { isAxiosError } from "axios";

export async function getUpcomingLessons({
  Page,
  PageSize = UPCOMING_LESSONS_PER_PAGE,
  ClassRoomId,
}: {
  Page?: string | number;
  PageSize?: string | number;
  ClassRoomId?: string;
}) {
  try {
    const response = await api.get(`/lesson/upcoming`, {
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

export async function getSingleLesson(id: number | string) {
  try {
    const response = await api.get(`/lesson/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error);
      throw new Error(error.response?.data || "حدث خطأ ما في الحصول الحصة");
    }
    throw error;
  }
}

export async function deleteLesson(id: number | string) {
  try {
    const response = await api.delete(`/lesson/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error);
      throw new Error(error.response?.data || "حدث خطأ ما في حذف الحصة");
    }
    throw error;
  }
}

export async function updateLesson(data: ILessonPutData) {
  try {
    const response = await api.put(`/post`, data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error);
      throw new Error(error.response?.data || "حدث خطأ ما في تحديث الحصة");
    }
    throw error;
  }
}

export async function createLesson(data: ILessonPostData) {
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

export async function joinLesson(id: number | string) {
  try {
    const response = await api.post(`/lesson/join/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error);
      throw new Error(
        error.response?.data || "حدث خطأ ما في الانضمام إلى الحصة",
      );
    }
    throw error;
  }
}
