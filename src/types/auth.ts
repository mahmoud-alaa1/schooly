export type TSignInResponse = {
  token: string;
  data: {
    id: string;
    email: string;
    name: string;
  };
};
