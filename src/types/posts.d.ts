interface IComments {
  id: number;
  content: string;
  createdAt: string;
  authorId: string;
  authorName: string;
}

interface IPost {
  id: number;
  content: string;
  comments: IComments[];
  createdAt: string;
  authorId: string;
  authorName: string;
  classRoomId: string;
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
