import api from "@/lib/axios";
import { UPCOMING_LESSONS_PER_PAGE } from "@/lib/constants";
import {
  IGetSingleLessonResponse,
  ILesson,
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
      throw new Error(
        error.response?.data?.message ||
          "حدث خطأ ما في الحصول على الحصص القادمة",
      );
    }
    throw error;
  }
}

export async function getSingleLesson(id: number | string) {
  try {
    const response = await api.get<IGetSingleLessonResponse>(`/lesson/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "حدث خطأ ما في الحصول الحصة",
      );
    }
    throw error;
  }
}

export async function deleteLesson(id: string) {
  try {
    const response = await api.delete(`/lesson/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "حدث خطأ ما في حذف الحصة",
      );
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
      throw new Error(
        error.response?.data?.message || "حدث خطأ ما في تحديث الحصة",
      );
    }
    throw error;
  }
}

export async function createLesson(data: ILessonPostData) {
  try {
    const response = await api.post(`/lesson`, data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "حدث خطأ ما في انشاء الحصة",
      );
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
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
