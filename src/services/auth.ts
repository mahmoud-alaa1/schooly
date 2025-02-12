import axios from "@/services/axios";
import { TSignInResponse } from "@/types/auth";
import { isAxiosError } from "axios";

export async function signIn({
  email = "",
  password = "",
  rememberMe = true,
}: {
  email: string;
  password: string;
  rememberMe: boolean;
}): Promise<TSignInResponse> {
  if (!email || !password) {
    throw new Error("Please provide email and password");
  }
  try {
    const res = await axios.post<TSignInResponse>("/auth/login", {
      email,
      password,
      rememberMe,
    });
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message || "An error occurred during login";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}
