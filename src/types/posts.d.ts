interface IComment {
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
  id: number;
}

interface IPost {
  id: number;
  content: string;
  comments: IComment[];
  createdAt: string;
  authorId: string;
  authorName: string;
  classRoomId: string;
}

interface IPostPutData {
  id: number | string;
  content: string;
}
interface IPostPostData {
  content: string;
  classRoomId: string;
}
