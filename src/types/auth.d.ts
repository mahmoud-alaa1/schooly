type TSignInResponse = {
  token: string;
  data: {
    id: string;
    email: string;
    name: string;
  };
};

interface IUser {
  id: string;
  email: string;
  name: string;
  token: string;
}
