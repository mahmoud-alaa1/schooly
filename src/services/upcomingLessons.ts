import { UPCOMING_LESSONS_PAGE_SIZE } from "@/lib/constants";
import axios from "./axios";
import { isAxiosError } from "axios";

const BASE_ROUTE = "/lesson";

export async function getLessons({ page }: { page: number }) {
  try {
    const lessons = await axios.get<IUpcomingLessonsResponse>(
      `${BASE_ROUTE}/upcoming?PageSize=${UPCOMING_LESSONS_PAGE_SIZE}&Page=${page}`
    );
    console.log(lessons);
    return lessons.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    throw new Error("حدث خطأ غير متوقع");
  }
}
