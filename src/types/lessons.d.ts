import { ELessonType } from "./enums";

type TLessonStatus = "Upcoming" | "Completed" | "Canceled";

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

interface ILessonJoinData {
  lessonId: string;
  formData: FormData;
}
