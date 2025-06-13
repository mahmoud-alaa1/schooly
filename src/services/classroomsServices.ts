import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function getAllClassrooms() {
  try {
    const response = await api.get<IGetAllClassroomsResponse>(`/classroom/all`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error);
      throw new Error(
        error.response?.data || "حدث خطأ ما في الحصول على الصفوف",
      );
    }
    throw error;
  }
}

export async function getSingleClassroom(id: string) {
  try {
    const response = await api.get<ISingleClassroomResponse>(
      `/classroom?id=${id}`,
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error);
      throw new Error(
        error.response?.data || "حدث خطأ ما في الحصول على الصف المعين",
      );
    }
    throw error;
  }
}
export async function getUserClassrooms() {
  try {
    const response = await api.get(`/user/classrooms`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error);
      throw new Error(
        error.response?.data || "حدث خطأ ما في الحصول على فصولك الدراسية",
      );
    }
    throw error;
  }
}
