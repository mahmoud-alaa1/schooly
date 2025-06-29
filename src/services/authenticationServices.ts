import api from "@/lib/axios";
import { ILoginResponse } from "@/types/login";
import { AxiosError, isAxiosError } from "axios";

export async function loginsService(data: {
  email: string;
  password: string;
  rememberMe: boolean;
}) {
  try {
    const response = await api.post<ILoginResponse>(`/auth/login`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function forgetPasswordService(data: IForgetPasswordRequest) {
  try {
    const response = await api.post<IForgetPasswordResponse>(
      `/auth/forgot-password`,
      data,
    );
    return response.data;
  } catch (error) {
    console.log(error);

    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "حدث خطأ ما حاول مرة أخرى",
      );
    }
    throw error;
  }
}

export async function verifyCodeService(data: IVerifyCodeRequest) {
  try {
    const response = await api.post<IVerifyCodeResponse>(
      `/auth/verify-code`,
      data,
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "حدث خطأ ما حاول مرة أخرى",
      );
    }
    throw error;
  }
}

export async function resetPasswordService(data: IResetPasswordRequest) {
  try {
    const response = await api.post<IResetPasswordResponse>(
      `/auth/reset-password`,
      data,
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "حدث خطأ ما حاول مرة أخرى",
      );
    }
    throw error;
  }
}

export async function verifyFace(data: FormData) {
  try {
    const response = await api.post<IVerifyFaceResponse>(
      `/auth/verify-face`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "حدث خطأ ما حاول مرة أخرى",
      );
    }
    throw error;
  }
}
