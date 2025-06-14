export const AUTH_ROUTES = [
  "/login",
  "/signup",
  "/forgot-password",
  "/verify-code",
  "/reset-password",
];

export const POSTS_PER_PAGE = 4;
export const UPCOMING_LESSONS_PER_PAGE = 4;
export const HOMEWORKS_PER_PAGE = 4;
export const COMMENTS_PER_PAGE = 2000;

export const MESSAGES = {
  ERROR: "حدث خطأ أثناء تحميل الدرس المباشر.",
  LOADING: "جاري التحقق من الهوية...",
  SUCCESS: "تم التحقق من الهوية بنجاح",
  RETRY: "اعادة التحقق",
  CANCEL: "الغاء",
  SUBMIT: "موافق",
  SUBMITTING: "جاري التحقق...",
  JOIN_SESSION: "انضم للجلسة",
  LIVE_BADGE: "مباشر",
  IDENTITY_VERIFICATION: "نموذج تحقيق الهوية",
} as const;

export const CAMERA_MESSAGES = {
  CAPTURE_NEW: "التقط صورة جديدة",
  CAPTURE: "التقط صورة",
  CAPTURE_INSTRUCTION: "التقط صورة من خلال الكامير",
} as const;

export const CAMERA_CONFIG = {
  width: 500,
  height: 200,
  screenshotFormat: "image/jpeg" as const,
  videoConstraints: { facingMode: "user" as const },
};
