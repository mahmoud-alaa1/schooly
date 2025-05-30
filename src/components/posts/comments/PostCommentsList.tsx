import useGetComment from "@/hooks/comments/useGetComment";
import CommentItem from "./CommentItem";

export default function PostCommentsList({
  postId,
}: {
  postId: string | number;
}) {
  const { data, ref } = useGetComment({ postId });
  const comments = data?.pages.flatMap((page) => page.data);

  if (!comments?.length) return null;

  return (
    <ul className="flex flex-col gap-6">
      {comments.map((comment, index) => (
        <li
          key={`${comment.id}-${comment.createdAt}`}
          ref={index === comments.length - 1 ? ref : undefined}
        >
          <CommentItem comment={comment} postId={postId} />
        </li>
      ))}
    </ul>
  );
}
