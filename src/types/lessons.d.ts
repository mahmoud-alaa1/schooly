interface ILesson {
  id: string;
  classRoomId: string;
  teacherId: string;
  subject: string;
  grade: string;
  title: string;
  lessonType: ELessonType;
  date: string;
  from: string;
  to: string;
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
