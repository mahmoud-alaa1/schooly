import UserAvatar from "../ui/userAvatar";
import { Button } from "../ui/button";
import { IoIosMore } from "react-icons/io";
import { IPost } from "@/types/posts";
import useComments from "@/hooks/useComments";
import AddComment from "./AddComment";

export default function PostComments({ post }: { post: IPost }) {
  const { mutatedFunc, commentsState } = useComments(post.comments, post.id);

  return (
    <ul className="flex flex-col gap-3 py-3 px-6 ">
      {commentsState?.map((comment, index) => (
        <li
          key={`${post.id} + ${index} `}
          className=" grid grid-cols-[auto_1fr_auto] items-center w-full gap-2"
        >
          <UserAvatar avatar={4} size={48} />
          <div className="flex flex-col flex-grow text-wrap flex-wrap">
            <strong className="text-xs">نور محمد</strong>
            <div
              dir="auto"
              className="text-black/85 text-xs font-light break-all whitespace-pre-wrap"
            >
              {comment}
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <IoIosMore />
          </Button>
        </li>
      ))}
      <AddComment mutatedFunc={mutatedFunc} id={post.id} />
    </ul>
  );
}
