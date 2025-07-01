import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  format,
  isPast,
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

/**
 * Converts a time string from 24-hour format (e.g., "14:30")
 * to 12-hour Arabic format (e.g., "٠٢:٣٠ م").
 *
 * @param time24 - Time string in "HH:mm" format (24-hour)
 * @returns A string formatted in 12-hour Arabic format (e.g., "٠٢:٣٠ م")
 */
export function formatArabicTime(time24: string): string {
  const [hours, minutes] = time24.split(":").map(Number);
  if (isNaN(hours) || isNaN(minutes)) {
    throw new Error("Invalid time format. Expected format: HH:mm");
  }

  const now = new Date();
  now.setHours(hours);
  now.setMinutes(minutes);
  now.setSeconds(0);
  now.setMilliseconds(0);

  return format(now, "hh:mm aaaa", { locale: ar });
}

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

export function base64ToBlob(dataURI: string) {
  const splitDataURI = dataURI.split(",");
  const byteString =
    splitDataURI[0].indexOf("base64") >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

  return new Blob([ia], { type: mimeString });
}

export function getImageUrl(filename?: string | null): string {
  if (!filename) return "/person1.png";
  if (filename.startsWith("http") || filename.startsWith("https"))
    return filename;
  return process.env.NEXT_PUBLIC_API_URL! + "/upload/" + filename;
}
export const getCameraState = (
  hasImage: boolean,
  isCapturing: boolean,
): "placeholder" | "capturing" | "captured" => {
  if (hasImage) return "captured";
  if (isCapturing) return "capturing";
  return "placeholder";
};

export function formatDate(date: string) {
  const parsedDate = parseISO(date);
  const formattedDate = format(parsedDate, "dd MMMM yyyy", {
    locale: arEG,
  });
  const formattedTime = format(parsedDate, "HH:mm a", {
    locale: arEG,
  });

  const data = { formattedDate, formattedTime };

  if (isPast(parsedDate)) {
    return { ...data, status: "completed" };
  }

  return {
    ...data,
    status: "active",
  };
}

export function isRTL(text: string): boolean {
  const rtlCharRegex = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
  return rtlCharRegex.test(text.trim()[0]);
}

export function getSubjectImage(subject: string) {
  const normalized = subject.trim();

  switch (normalized) {
    case "رياضيات":
      return "/maths.jpg";
    case "فيزياء":
      return "/physics.jpg";
    case "كيمياء":
      return "/physics.jpg"; // استخدم نفس صورة الفيزياء أو ضيف صورة للكيمياء لو عندك
    case "جغرافيا":
      return "/geography.jpg";
    case "اللغة الإنجليزية":
    case "انجليزي":
      return "/english.jpg";
    case "اللغة العربية":
    case "عربي":
      return "/arabic.jpg";
    case "دين":
    case "التربية الدينية":
    case "قرآن":
      return "/quran.jpg";
    case "علوم":
      return "/physics.jpg"; // مؤقتًا لو ما عندكش صورة علوم، ممكن تخصص واحدة لاحقًا
    default:
      return "/default-subject.png"; // fallback
  }
}
