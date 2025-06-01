type TLessonStatus = "Upcoming" | "Completed" | "Cancelled";

interface ILesson {
  id: string;
  teacherId: string;
  teacherName: string;
  classRoomId: string;
  title: string;
  grade: string;
  subject: string;
  lessonType: ELessonType;
  date: string;
  from: string;
  to: string;
  status: number;
}

interface ILessonPutData {
  id: string;
  classRoomId: string;
  title: string;
  lessonType: ELessonType;
  date: string;
  from: string;
  to: string;
}

interface ILessonPostData {
  classRoomId: string;
  title: string;
  lessonType: ELessonType;
  date: string;
  from: string;
  to: string;
}

enum ELessonType {
  EXPLANATION = 0,
  HOMEWORK_SOLUTION = 1,
  PRACTICE = 2,
  REVISION = 3,
  OTHER = 4,
}
