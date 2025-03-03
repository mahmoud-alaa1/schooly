import axios from "@/services/axios";
import { TGetUpcomingLessonsResponse } from "@/types/lessons";
import { isAxiosError } from "axios";

export async function getUpcomingLessons() {
  try {
    const res = await axios.get<TGetUpcomingLessonsResponse>(
      "/lesson/upcoming"
    );

    return res.data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        "An error occurred while fetching lessons";
      throw new Error(message);
    } else throw new Error("An unexpected error occurred");
  }
}
