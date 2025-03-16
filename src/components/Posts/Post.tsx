import PostContent from "./PostContent";
import PostComments from "./PostComments";

export default function Post({ post }: { post: IPost }) {
  return (
    <div className="bg-primary-foreground rounded-2xl border border-neutral-100 text-xs">
      <PostContent post={post} />
      <PostComments post={post} />
    </div>
  );
}
