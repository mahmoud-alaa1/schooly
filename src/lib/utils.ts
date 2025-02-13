//date
import {
  format,
  parse,
  parseISO,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  isTomorrow,
} from "date-fns";
import { arEG } from "date-fns/locale";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type TBadgeVariant = "blue" | "orange" | "red";

export function getTimeUntilStart(
  dateStr: string,
  startTimeStr: string
): { text: string; variant: TBadgeVariant } {
  const secondsDifference = differenceInSeconds(new Date(dateStr), new Date());
  const miniutesDiffernce = differenceInMinutes(new Date(dateStr), new Date());
  const hoursDifference = differenceInHours(new Date(dateStr), new Date());
  console.log(secondsDifference, miniutesDiffernce, hoursDifference);
  return isTomorrow(new Date(dateStr))
    ? { text: "غداً", variant: "blue" }
    : Math.abs(secondsDifference) < 60
    ? { text: `ثانية ${secondsDifference}`, variant: "blue" }
    : Math.abs(miniutesDiffernce) < 60
    ? { text: `دقيقة ${miniutesDiffernce}`, variant: "orange" }
    : Math.abs(hoursDifference) < 23
    ? { text: `دقيقة ${miniutesDiffernce}`, variant: "red" }
    : { text: format(dateStr, "d MMMM", { locale: arEG }), variant: "red" };
}
