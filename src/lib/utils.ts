import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDistanceToNow(date: string | Date) {
  return formatDistanceToNow(new Date(date), {
    locale: ar,
    addSuffix: true,
  });
}
