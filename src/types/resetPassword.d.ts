interface IResetPasswordResponse {
  message: string;
}
interface IResetPasswordRequest {
  email: string;
  newPassword: string;
}
