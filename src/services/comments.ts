import axios from "@/services/axios";
import { isAxiosError } from "axios";

export const sendComment = async ({
  newComment,
  postId,
}: {
  newComment: string;
  postId: number;
}) => {
  try {
    const response = await axios.post(`/comment`, {
      content: newComment,
      postId,
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("فشل إرسال التعليق");
  }
};
