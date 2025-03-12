export type TSignInResponse = {
  token: string;
  data: {
    id: string;
    email: string;
    name: string;
  };
};

export interface IUser {
  id: string;
  email: string;
  name: string;
  token: string;
}
