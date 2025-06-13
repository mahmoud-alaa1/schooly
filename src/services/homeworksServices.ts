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
      `/homework/active`,
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

export async function createHomework(data: IHomeworkPostData) {
  try {
    const response = await api.post(`/homework`, data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error);
      throw new Error(error.response?.data || "حدث خطأ ما في انشاء الواجب");
    }
    throw error;
  }
}

export async function submitHomework(data: IHomeworkPostData) {
  try {
    const response = await api.post(`/homework`, data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error);
      throw new Error(error.response?.data || "حدث خطأ ما في انشاء الواجب");
    }
    throw error;
  }
}
