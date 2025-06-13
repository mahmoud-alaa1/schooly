import { EROLES } from "./enums";

interface IUser {
  id: string;
  email: string;
  name: string;
  role: EROLES;
}

interface ILoginResponse {
  data: IUser;
  token: string;
}
