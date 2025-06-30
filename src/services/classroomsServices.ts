import api from "@/lib/axios";
import { CLASSROOMS_PER_PAGE } from "@/lib/constants";
import { isAxiosError } from "axios";

export async function getAllClassrooms({
  Page,
  PageSize = CLASSROOMS_PER_PAGE,
}: {
  Page?: string | number;
  PageSize?: string | number;
}) {
  try {
    const response = await api.get<IPaginatedResponse<IClassroom>>(
      `/classroom/all`,
      {
        params: {
          page: Page,
          pageSize: PageSize,
        },
      },
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "حدث خطأ ما في الحصول على الصفوف",
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
      throw new Error(
        error.response?.data?.message || "حدث خطأ ما في الحصول على الصف المعين",
      );
    }
    throw error;
  }
}
export async function getUserClassrooms() {
  try {
    const response =
      await api.get<IGetAllClassroomsResponse>(`/user/classrooms`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "حدث خطأ ما في الحصول على فصولك الدراسية",
      );
    }
    throw error;
  }
}
