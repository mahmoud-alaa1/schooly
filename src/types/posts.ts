export interface IComments {
  id: number;
  content: string;
  createdAt: string;
}

export interface IPost {
  id: number;
  content: string;
  comments: IComments[];
  createdAt: string;
}

export interface IPostsResponse {
  data: IPost[];
  meta: {
    totalItems: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
  };
}
