import { BoxBody } from "../../Box";
import useGetComment from "@/hooks/comments/useGetComment";
import CommentItem from "./CommentItem";
export default function PostCommentsList({
  postId,
}: {
  postId: string | number;
}) {
  const { data, isPending, error, ref } = useGetComment({ postId });
  const comments = data?.pages.flatMap((page) => page.data);
  return (
    <ul className="space-y-6">
      {comments?.map((comment, index) => (
        <li
          key={comment.id}
          ref={index === comments.length - 1 ? ref : undefined}
        >
          <CommentItem comment={comment} postId={postId} />
        </li>
      ))}
    </ul>
  );
}
