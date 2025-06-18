interface ICommentPostData {
  postId: string | number;
  content: string;
}
interface ICommentPostResponse {
  data: IComment;
}

interface IComment {
  id: string | number;
  createdAt: string | Date;
  content: string;
  authorId: string | number;
  authorName: string;
  authorEmail: string;
  profilePictureUrl: string | null;
}

interface ICommentPutData {
  id: string | number;
  content: string;
}
interface IUpdateCommentResponse {
  data: {
    id: string | number;
    content: string;
    authorId: string | number;
  };
}
