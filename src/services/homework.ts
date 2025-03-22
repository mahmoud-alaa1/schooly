import { HOMEWORKS_PAGE_SIZE } from "@/lib/constants";
import axios from "@/services/axios";

import { isAxiosError } from "axios";

export const getHomeworks = async (
  currentPage: number,
  classRoomId?: string
) => {
  try {
    const response = await axios.get<THomeworkResponse>(
      `/homework/active?page=${currentPage}&pageSize=${HOMEWORKS_PAGE_SIZE}${
        classRoomId ? `&ClassRoomId=${classRoomId}` : ""
      }`
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) throw new Error(error.response?.data.message);
    throw new Error("فشل جلب الواجبات");
  }
};
