export enum EROLES {
  ADMIN = 0,
  STUDENT = 1,
  TEACHER = 2,
  OWNER = 3,
}

export const lessonTypeMap: Record<string, string> = {
  "0": "شرح",
  "1": "حل واجب",
  "2": "تدريب",
  "3": "مراجعة",
  "4": "أخرى",
};
export enum ELessonTypeString {
  Explain = "0",
  HomeworkSolution = "1",
  Practice = "2",
  Revision = "3",
  Other = "4",
}
export enum ELessonTypeNumber {
  Explain = 0,
  HomeworkSolution = 1,
  Practice = 2,
  Revision = 3,
  Other = 4,
}
export enum EGender {
  MALE = 0,
  FEMALE = 1,
}
export enum EDepartment {
  AMERICAN = 0,
}

export enum EVerificationState {
  CAPTURING = "capturing",
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "success",
}
