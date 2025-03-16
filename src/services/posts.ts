import axios from "@/services/axios";
import { isAxiosError } from "axios";

export const getPosts = async (currentPage: number) => {
  try {
    const response = await axios.get<IPostsResponse>(
      `/post/all?Page=${currentPage}&PageSize=1`
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) throw new Error(error.response?.data.message);
    throw new Error("فشل جلب المنشورات");
  }
};
