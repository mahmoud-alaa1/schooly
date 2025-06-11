"use client";

import { isWithinInterval, parseISO } from "date-fns";
import useUpcomingLessons from "./lessons/useUpcomingLessons";

export const useLiveLesson = () => {
  const { data, isLoading, isError } = useUpcomingLessons(50000);
  console.log("useLiveLesson data", data);
  const { date, from, to } = data?.pages[0]?.data[0] || {};

  const now = new Date();
  const start = parseISO(`${date}T${from}`);
  let end = parseISO(`${date}T${to}`);

  if (end <= start) {
    end = new Date(end.getTime() + 24 * 60 * 60 * 1000);
  }

  if (isWithinInterval(now, { start, end }))
    return {
      lesson: data?.pages[0]?.data[0],
      isLoading,
      isError,
    };

  return {
    lesson: null,
    isLoading,
    isError,
  };
};
