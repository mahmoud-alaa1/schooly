import { TFile } from "@/types/file";
import axios from "axios";

export const getAllFiles = async (token: string | null) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/upload/all`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data?.data as TFile[];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getFileContent = async (
  token: string | null,
  storedFileName: string
) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/upload/${storedFileName}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};
