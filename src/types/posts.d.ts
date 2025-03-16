interface IComments {
  id: number;
  content: string;
  createdAt: string;
}

interface IPost {
  id: number;
  content: string;
  comments: IComments[];
  createdAt: string;
}

interface IPostsResponse {
  data: IPost[];
  meta: {
    totalItems: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
  };
}
