import api from "@/lib/axios";
import { HOMEWORKS_PER_PAGE } from "@/lib/constants";
import { isAxiosError } from "axios";

export async function getHomeworks({
  page,
  pageSize = HOMEWORKS_PER_PAGE,
  ClassRoomId,
}: {
  page?: string | number;
  pageSize?: string | number;
  ClassRoomId?: string;
}) {
  try {
    const response = await api.get<IPaginatedResponse<IHomework>>(
      `/homework/all`,
      {
        params: {
          page,
          pageSize,
          ClassRoomId,
        },
      },
    );
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

export async function deleteHomework(homeWorkId: string) {
  try {
    const response = await api.delete(`/homework`, {
      params: {
        homeWorkId,
      },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "حدث خطأ ما في حذف الواجب",
      );
    }
    throw error;
  }
}

export async function createHomework(data: IHomeworkPostData) {
  try {
    const response = await api.post(`/homework`, data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "حدث خطأ ما في انشاء الواجب",
      );
    }
    throw error;
  }
}

export async function submitHomework(data: ISubmitHomeworkPostData) {
  try {
    const response = await api.post(
      `/homework/${data.homeWorkId}/submit`,
      data,
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error);
      throw new Error(
        error.response?.data?.message || "حدث خطأ ما في انشاء الواجب",
      );
    }
    throw error;
  }
}

export async function getSubmittedStudents(homeWorkId: string) {
  try {
    const response = await api.get<IPaginatedResponse<IStudentSubmitHomework>>(
      `/homework/${homeWorkId}/students`,
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error);
      throw new Error(
        error.response?.data?.message || "حدث خطأ ما في ارسال الواجب",
      );
    }
    throw error;
  }
}
