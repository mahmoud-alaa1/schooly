import { EGender, EROLES } from "./enums";

interface IUser {
  id: string;
  email: string;
  name: string;
  role: EROLES;
  profilePictureUrl: string;
  gender: EGender;
}

interface ILoginResponse {
  data: IUser;
  token: string;
}
