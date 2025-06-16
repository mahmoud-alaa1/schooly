interface IHomework {
  homeWorkId: string;
  fileUrl: string;
  fileName: string;
  lessonTitle: string;
  teacherName: string;
  subjectName: string;
  isSubmitted: boolean;
  totalSubmissions: number;
  deadline: string;
  grade: string;
}

interface IHomeworkPostData {
  lessonId: string;
  deadline: string | Date;
  fileUrl: string;
}
interface ISubmitHomeworkPostData {
  fileUrl: string;
  homeWorkId: string;
}
interface IStudentSubmitHomework {
  studentId: string;
  studentName: string;
  fileUrl: string;
  fileName: string;
  dateline: string;
  submittedDate: string;
}

type IHomeworkFormData = Omit<IHomeworkPostData, "classRoomId">;
