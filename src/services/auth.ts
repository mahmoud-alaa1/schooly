import axios from "@/services/axios";
import { isAxiosError } from "axios";

interface SignInParams {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export async function signIn({
  email,
  password,
  rememberMe = true,
}: SignInParams): Promise<TSignInResponse> {
  if (!email || !password) {
    throw new Error("Please provide both email and password.");
  }

  try {
    const { data } = await axios.post<TSignInResponse>("/auth/login", {
      email,
      password,
      rememberMe,
    });

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
    throw new Error("An unexpected error occurred during login.");
  }
}
