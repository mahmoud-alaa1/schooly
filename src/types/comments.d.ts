interface ICommentPostData {
  postId: string | number;
  content: string;
}

interface IComment {
  id: string | number;
  createdAt: string | Date;
  content: string;
  authorId: string | number;
  authorName: string;
  authorEmail: string;
}
