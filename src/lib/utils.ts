//date
import {
  format,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  isTomorrow,
  isWithinInterval,
  isToday,
} from "date-fns";
import { arEG } from "date-fns/locale";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type TBadgeVariant = "blue" | "orange" | "red";
type TBadgeTimeUpcomingLessons = { text: string; variant: TBadgeVariant };

function createDateTime(dateStr: string, timeStr: string): Date {
  const date = new Date(dateStr);
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);

  date.setHours(hours, minutes, seconds, 0);

  return date;
}

const generateTimeDifferenceText = (
  laterDate: Date,
  earlierDate: Date
): TBadgeTimeUpcomingLessons => {
  const secondsDifference = differenceInSeconds(laterDate, earlierDate);
  const miniutesDiffernce = differenceInMinutes(laterDate, earlierDate);
  const hoursDifference = differenceInHours(laterDate, earlierDate);

  return Math.abs(secondsDifference) < 60
    ? { text: `ثانية ${secondsDifference}`, variant: "blue" }
    : Math.abs(miniutesDiffernce) < 60
    ? { text: `دقيقة ${miniutesDiffernce}`, variant: "orange" }
    : { text: `ساعة ${hoursDifference}`, variant: "red" };
};

export function getUpcomingLessonsBadgeText(
  dateStr: string,
  startTimeStr: string,
  to: string
): TBadgeTimeUpcomingLessons {
  const startDateTime = createDateTime(dateStr, startTimeStr);
  const endDateTime = createDateTime(dateStr, to);
  if (differenceInSeconds(endDateTime, new Date()) < 0) {
    return { text: "انتهت", variant: "blue" };
  } else if (
    isWithinInterval(new Date(), { start: startDateTime, end: endDateTime })
  ) {
    return { text: "الدرس جاري", variant: "orange" };
  }
  return isTomorrow(startDateTime)
    ? { text: "غداً", variant: "blue" }
    : isToday(dateStr)
    ? generateTimeDifferenceText(startDateTime, new Date())
    : {
        text: format(dateStr, "d MMMM", { locale: arEG }),
        variant: "red",
      };
}
