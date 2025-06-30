// lib/cookies/getLessonCookieExpiry.ts
import { ILesson } from "@/types/lessons";
import { parseISO, differenceInSeconds } from "date-fns";

export function getLessonCookieExpiry(lesson: ILesson): number {
  const lessonEndISO = `${lesson.date}T${lesson.to}`;
  const lessonEndDate = parseISO(lessonEndISO);
  const now = new Date();

  const secondsUntilEnd = differenceInSeconds(lessonEndDate, now);
  return Math.max(0, secondsUntilEnd); 
}
