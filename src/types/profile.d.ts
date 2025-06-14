import { EDepartment, EGender, EROLES } from "./enums";

type TStudentExtra = {
  parent: string;
  address: string;
  dateOfJoining: string;
  department: EDepartment;
  grade: EGender;
};

declare interface IProfileGetResponse {
  data: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: EGender;
    profilePictureUrl: null;
    role: EROLES;
    studentExtra: null | TStudentExtra;
  };
}
declare interface IProfilePutResponse {
  data: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string | null;
    dateOfBirth: string;
    gender: EGender;
    profilePictureUrl: string | null;
    role: EROLES;
    studentExtra: null | TStudentExtra;
  };
}
