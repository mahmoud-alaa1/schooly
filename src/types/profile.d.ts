import { EDepartment, EGender, EROLES } from "./enums";

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
    studentExtra: null | {
      parent: string;
      address: string;
      dateOfJoining: string;
      department: EDepartment;
      grade: EGender;
    };
  };
}
