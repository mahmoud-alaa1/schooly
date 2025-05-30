export const AUTH_ROUTES = [
  "/login",
  "/signup",
  "/forgot-password",
  "/verify-code",
  "/reset-password",
];

export const POSTS_PER_PAGE = 5;
export const UPCOMING_LESSONS_PER_PAGE = 5;
export const HOMEWORKS_PER_PAGE = 5;
export const COMMENTS_PER_PAGE = 2000;

export const TIME_THRESHOLDS = {
  SHOW_SECONDS_UNDER: 60,
  SHOW_MINUTES_UNDER: 60,
  SHOW_HOURS_UNDER: 24,
} as const;

export const BADGE_MESSAGES = {
  FINISHED: "انتهت",
  IN_PROGRESS: "الدرس جاري",
  TOMORROW: "غداً",
  TODAY: "اليوم",
  STARTING_SOON: "يبدأ قريباً",
} as const;
