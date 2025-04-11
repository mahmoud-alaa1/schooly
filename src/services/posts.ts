import axios from "@/services/axios";
import { isAxiosError } from "axios";
import { POSTS_PAGE_SIZE } from "@/lib/constants";
export const getPosts = async (currentPage: number) => {
  try {
    const response = await axios.get<IPostsResponse>(
      `/post/all?Page=${currentPage}&PageSize=${POSTS_PAGE_SIZE}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) throw new Error(error.response?.data.message);
    throw new Error("فشل جلب المنشورات");
  }
};
