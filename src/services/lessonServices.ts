import api from "@/lib/axios";
import { UPCOMING_LESSONS_PER_PAGE } from "@/lib/constants";
import {
  ILesson,
  ILessonJoinData,
  ILessonJoinResponse,
  ILessonPostData,
  ILessonPutData,
  TLessonStatus,
} from "@/types/lessons";
import { isAxiosError } from "axios";

export async function getLessons({
  Page,
  PageSize = UPCOMING_LESSONS_PER_PAGE,
  classRoomId,
  Status,
}: {
  Page?: string | number;
  PageSize?: string | number;
  classRoomId?: string;
  Status?: TLessonStatus;
}) {
  try {
    const response = await api.get<IPaginatedResponse<ILesson>>(`/lesson`, {
      params: {
        Page,
        PageSize,
        classRoomId,
        Status,
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
    const response = await api.put(`/lesson`, data);
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
  console.log(data.lessonType);
  try {
    const response = await api.post(`/lesson`, data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error);
      throw new Error(error.response?.data || "حدث خطأ ما في انشاء الحصة");
    }
    throw error;
  }
}

export async function joinLesson(
  formData: FormData,
  lessonId: string,
  token?: string,
) {
  try {
    const response = await api.post<ILessonJoinResponse>(
      `/lesson/join`,
      formData,
      {
        params: {
          Id: lessonId,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data);
      throw new Error(
        error.response?.data ?? "حدث خطأ ما في الانضمام إلى الحصة",
      );
    }
    throw error;
  }
}
