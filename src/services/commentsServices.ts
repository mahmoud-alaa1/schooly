import api from "@/lib/axios";
import { COMMENTS_PER_PAGE } from "@/lib/constants";
import { isAxiosError } from "axios";

export async function getComments({
  postId,
  page,
  PageSize = COMMENTS_PER_PAGE,
}: {
  page?: string | number;
  PageSize?: string | number;
  postId: string | number;
}) {
  try {
    const response = await api.get<IPaginatedResponse<IComment>>(
      `/comment/post/${postId}`,
      {
        params: {
          page,
          PageSize,
        },
      },
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error);
      throw new Error(
        error.response?.data || "حدث خطأ ما في الحصول على التعليقات",
      );
    }
    throw error;
  }
}

export async function deleteComment(id: number | string) {
  try {
    const response = await api.delete(`/comment/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error);
      throw new Error(error.response?.data || "حدث خطأ ما في حذف التعليق");
    }
    throw error;
  }
}

export async function createComment(data: ICommentPostData) {
  try {
    const response = await api.post<IComment>(`/comment`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error);
      throw new Error(error.response?.data || "حدث خطأ ما في انشاء التعليق");
    }
    throw error;
  }
}

export async function updateComment(data: ICommentPutData): Promise<IComment> {
  try {
    const response = await api.put<IComment>(`/comment`, data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error);
      throw new Error(error.response?.data || "حدث خطأ ما في تحديث التعليق");
    }
    throw error;
  }
}
