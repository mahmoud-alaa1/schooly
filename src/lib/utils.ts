import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  format,
  isToday,
  isTomorrow,
  isWithinInterval,
  parseISO,
} from "date-fns";
import { arEG } from "date-fns/locale";
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

export function getUpcomingLessonsBadgeText(
  dateStr: string,
  startTimeStr: string,
  endTimeStr: string,
): { text: string; variant: TBadgeVariant } {
  const now = new Date();
  const start = parseISO(`${dateStr}T${startTimeStr}`);
  let end = parseISO(`${dateStr}T${endTimeStr}`);

  if (end <= start) {
    end = new Date(end.getTime() + 24 * 60 * 60 * 1000);
  }

  // Past lesson
  if (differenceInSeconds(end, now) < 0)
    return { text: "انتهت", variant: "gray" };

  // In progress
  if (isWithinInterval(now, { start, end }))
    return { text: "جارية الآن", variant: "green" };

  // Tomorrow
  if (isTomorrow(start)) return { text: "غداً", variant: "blue" };

  // Today - show time remaining
  if (isToday(start)) {
    const seconds = differenceInSeconds(start, now);
    const minutes = differenceInMinutes(start, now);
    const hours = differenceInHours(start, now);

    if (seconds < 60) return { text: `${seconds} ثانية`, variant: "orange" };
    if (minutes < 60)
      return {
        text: minutes === 2 ? "دقيقتين" : `${minutes} دقائق`,
        variant: "orange",
      };
    return {
      text: hours === 2 ? "ساعتين" : `${hours} ساعات`,
      variant: "orange",
    };
  }

  const days = differenceInDays(start, now);

  // Within a week - show day name
  if (days <= 7)
    return { text: format(start, "EEEE", { locale: arEG }), variant: "blue" };

  // Future - show date
  return { text: format(start, "d MMMM", { locale: arEG }), variant: "red" };
}
