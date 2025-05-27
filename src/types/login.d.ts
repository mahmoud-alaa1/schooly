interface IUser {
  id: string;
  email: string;
  name: string;
  role: EROLES;
  token: string;
}

interface ILoginResponse {
  data: IUser;
}
