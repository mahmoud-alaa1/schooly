import axios from "@/services/axios";

export const getFileContent = async (storedFileName: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/upload/${storedFileName}`,
      {
        responseType: "blob",
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
