import { EDepartment, EGender, EROLES } from "./enums";

type TStudentExtra = {
  parent: string;
  address: string;
  dateOfJoining: string;
  department: EDepartment;
  grade: EGender;
};

declare interface IProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: EGender;
  profilePictureUrl: null | string;
  role: EROLES;
  studentExtra: null | TStudentExtra;
  profilePictureUrl: string | null;
}

declare interface IProfileGetResponse {
  data: IProfile;
}

declare interface IProfilePutResponse {
  data: IProfile;
}
