interface IHomework {
  homeWorkId: string;
  fileUrl: string;
  fileName: string;
  lessonTitle: string;
}

interface IHomeworkPostData {
  lessonId: string;
  classRoomId: string;
  toDate: string | Date;
  fileUrl: string;
}
interface ISubmitHomeworkPostData {
  fileUrl: string;
  homeWorkId: string;
}

type IHomeworkFormData = Omit<IHomeworkPostData, "classRoomId">;
