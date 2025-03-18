enum LessonType {
  Explain,
  HomeworkSolution,
  Practice,
  Revision,
  Other,
}

type TLesson = {
  id: string;
  teacherId: string;
  subject: string;
  grade: string;
  title: string;
  lessonType: LessonType;
  date: string;
  from: string;
  to: string;
};

interface IUpcomingLessonsResponse {
  data: TLesson[];
  meta: {
    totalItems: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
  };
}
