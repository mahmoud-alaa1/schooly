import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  differenceInDays,
  differenceInSeconds,
  format,
  isToday,
  isTomorrow,
  isValid,
  isWithinInterval,
  parseISO,
} from "date-fns";
import { arEG } from "date-fns/locale";
import { BADGE_MESSAGES, TIME_THRESHOLDS } from "./constants";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

export function getDistanceToNow(date: string | Date) {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor(
    (now.getTime() - targetDate.getTime()) / 1000,
  );
  const diffInHours = Math.floor(diffInSeconds / 3600);

  if (diffInHours < 24) {
    return formatDistanceToNow(targetDate, { addSuffix: true, locale: ar });
  } else {
    return format(targetDate, "dd MMM yyyy", { locale: ar });
  }
}

type TBadgeVariant = "blue" | "orange" | "red" | "green" | "gray";

type TBadgeTimeUpcomingLessons = {
  text: string;
  variant: TBadgeVariant;
  timeRemaining?: number; // in seconds
};

function createDateTime(dateStr: string, timeStr: string): Date {
  if (!dateStr || !timeStr) {
    throw new Error("Date and time strings are required");
  }

  let date: Date;

  // Handle ISO date format or simple YYYY-MM-DD
  if (dateStr.includes("T")) {
    date = parseISO(dateStr);
  } else {
    date = new Date(dateStr);
  }

  if (!isValid(date)) {
    throw new Error(`Invalid date: ${dateStr}`);
  }

  // Parse time with support for HH:MM or HH:MM:SS
  const timeParts = timeStr.split(":").map((part) => {
    const num = parseInt(part, 10);
    if (isNaN(num)) {
      throw new Error(`Invalid time format: ${timeStr}`);
    }
    return num;
  });

  if (timeParts.length < 2 || timeParts.length > 3) {
    throw new Error(
      `Invalid time format: ${timeStr}. Expected HH:MM or HH:MM:SS`,
    );
  }

  const [hours, minutes, seconds = 0] = timeParts;

  // Validate time components
  if (
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59 ||
    seconds < 0 ||
    seconds > 59
  ) {
    throw new Error(`Invalid time values: ${timeStr}`);
  }

  date.setHours(hours, minutes, seconds, 0);
  return date;
}

const generateTimeDifferenceText = (
  laterDate: Date,
  earlierDate: Date,
): TBadgeTimeUpcomingLessons => {
  const totalSeconds = differenceInSeconds(laterDate, earlierDate);
  const absoluteSeconds = Math.abs(totalSeconds);

  // Handle past times
  if (totalSeconds < 0) {
    return { text: BADGE_MESSAGES.FINISHED, variant: "gray" };
  }

  const minutes = Math.floor(absoluteSeconds / 60);
  const hours = Math.floor(absoluteSeconds / 3600);
  const days = differenceInDays(laterDate, earlierDate);

  // Less than a minute - show seconds
  if (absoluteSeconds < TIME_THRESHOLDS.SHOW_SECONDS_UNDER) {
    const secondsText =
      absoluteSeconds === 1
        ? "ثانية واحدة"
        : absoluteSeconds === 2
          ? "ثانيتان"
          : absoluteSeconds <= 10
            ? `${absoluteSeconds} ثوانٍ`
            : `${absoluteSeconds} ثانية`;

    return {
      text: secondsText,
      variant: "orange",
      timeRemaining: absoluteSeconds,
    };
  }

  // Less than an hour - show minutes
  if (minutes < TIME_THRESHOLDS.SHOW_MINUTES_UNDER) {
    const minutesText =
      minutes === 1
        ? "دقيقة واحدة"
        : minutes === 2
          ? "دقيقتان"
          : minutes <= 10
            ? `${minutes} دقائق`
            : `${minutes} دقيقة`;

    return {
      text: minutesText,
      variant: "orange",
      timeRemaining: absoluteSeconds,
    };
  }

  // Less than 24 hours - show hours
  if (hours < TIME_THRESHOLDS.SHOW_HOURS_UNDER) {
    const hoursText =
      hours === 1
        ? "ساعة واحدة"
        : hours === 2
          ? "ساعتان"
          : hours <= 10
            ? `${hours} ساعات`
            : `${hours} ساعة`;

    return {
      text: hoursText,
      variant: "blue",
      timeRemaining: absoluteSeconds,
    };
  }

  // More than 24 hours - show days
  const daysText =
    days === 1
      ? "يوم واحد"
      : days === 2
        ? "يومان"
        : days <= 10
          ? `${days} أيام`
          : `${days} يوماً`;

  return {
    text: daysText,
    variant: "blue",
    timeRemaining: absoluteSeconds,
  };
};

export function getUpcomingLessonsBadgeText(
  dateStr: string,
  startTimeStr: string,
  endTimeStr: string,
  currentTime?: Date,
): TBadgeTimeUpcomingLessons {
  try {
    const now = currentTime || new Date();
    const startDateTime = createDateTime(dateStr, startTimeStr);
    const endDateTime = createDateTime(dateStr, endTimeStr);

    // Validate that end time is after start time
    if (endDateTime <= startDateTime) {
      console.warn("End time should be after start time");
    }

    // Check if lesson has finished
    if (differenceInSeconds(endDateTime, now) < 0) {
      return { text: BADGE_MESSAGES.FINISHED, variant: "gray" };
    }

    // Check if lesson is currently in progress
    if (isWithinInterval(now, { start: startDateTime, end: endDateTime })) {
      const remainingSeconds = differenceInSeconds(endDateTime, now);
      return {
        text: BADGE_MESSAGES.IN_PROGRESS,
        variant: "green",
        timeRemaining: remainingSeconds,
      };
    }

    // Check if lesson is tomorrow
    if (isTomorrow(startDateTime)) {
      return { text: BADGE_MESSAGES.TOMORROW, variant: "blue" };
    }

    // Check if lesson is today
    if (isToday(startDateTime)) {
      return generateTimeDifferenceText(startDateTime, now);
    }

    // For future dates, show formatted date
    const daysDifference = differenceInDays(startDateTime, now);

    if (daysDifference <= 7) {
      // For dates within a week, show day name
      return {
        text: format(startDateTime, "EEEE", { locale: arEG }),
        variant: "blue",
      };
    }

    // For dates further away, show formatted date
    return {
      text: format(startDateTime, "d MMMM", { locale: arEG }),
      variant: "red",
    };
  } catch (error) {
    console.error("Error generating lesson badge text:", error);
    return {
      text: "خطأ في التوقيت",
      variant: "gray",
    };
  }
}
