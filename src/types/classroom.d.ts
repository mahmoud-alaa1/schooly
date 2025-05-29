interface IClassroom {
  id: string;
  teacherId: string;
  subject: string;
  grade: string;
}
interface ISingleClassroomResponse {
  data: IClassroom;
}
