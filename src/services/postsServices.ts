import api from "@/lib/axios";
import { POSTS_PER_PAGE } from "@/lib/constants";
import { isAxiosError } from "axios";

export async function getAllPosts({
  Page,
  PageSize = POSTS_PER_PAGE,
  ClassRoomId,
}: {
  Page?: string | number;
  PageSize?: string | number;
  ClassRoomId?: string;
}) {
  try {
    const response = await api.get<IPaginatedResponse<IPost>>(`/post/all`, {
      params: {
        Page,
        PageSize,
        ClassRoomId,
      },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "حدث خطأ ما في الحصول على المنشورات",
      );
    }
    throw error;
  }
}

export async function getSinglePost(id: number | string) {
  try {
    const response = await api.get(`/post/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "حدث خطأ ما في الحصول على المنشور",
      );
    }
    throw error;
  }
}

export async function deletePost(id: number | string) {
  try {
    const response = await api.delete(`/post/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "حدث خطأ ما في حذف المنشور",
      );
    }
    throw error;
  }
}

export async function getPostAuthor(id: number | string) {
  try {
    const response = await api.delete(`/post/author/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "حدث خطأ ما الحصول على المؤلف",
      );
    }
    throw error;
  }
}

export async function updatePost(data: {
  id: number | string;
  content: string;
}) {
  try {
    const response = await api.put(`/post`, data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "حدث خطأ ما في تحديث المنشور",
      );
    }
    throw error;
  }
}

export async function createPost(data: IPostPostData) {
  try {
    const response = await api.post(`/post`, data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "حدث خطأ ما في انشاء المنشور",
      );
    }
    throw error;
  }
}
