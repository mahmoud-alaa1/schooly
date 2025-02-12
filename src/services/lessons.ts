import axios from "@/services/axios";
import { isAxiosError } from "axios";

enum LessonType {
  
}

type TGetUpcomingLessonsResponse = {
  data: [
    {
      id: string;
      teacherId: string;
      subject: string;
      grade: string;
      title: string;
      lessonType: number;
      date: string;
      from: string;
      to: string;
    }
  ];
  meta: {
    totalItems: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
  };
};

export async function getUpcomingLessons() {
  try {
    const res = await axios.get<TGetUpcomingLessonsResponse>(
      "/lesson/upcoming"
    );

    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        "An error occurred while fetching lessons";
      throw new Error(message);
    } else throw new Error("An unexpected error occurred");
  }
}
