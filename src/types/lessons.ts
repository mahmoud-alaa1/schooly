enum LessonType {
  Explain,
  HomeworkSolution,
  Practice,
  Revision,
  Other,
}

type TGetUpcomingLessonsResponse = {
  data: [
    {
      id: string;
      teacherId: string;
      subject: string;
      grade: string;
      title: string;
      lessonType: LessonType;
      date: string;
      from: string;
      to: string;
    }
  ];
  meta: {
    totalItems: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
  };
};
