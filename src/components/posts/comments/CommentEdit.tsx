"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { Form } from "@/components/ui/form";
import FormTextArea from "@/components/forms/FormTextArea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SendHorizonal, X } from "lucide-react";
import { commentSchema } from "@/schemas/commentsSchema";
import useUpdateComment from "@/hooks/comments/useUpdateComment";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/store/auth";
import UserAvatar from "@/components/UserAvatar";

export default function CommentEdit({
  postId,
  cancelEdit,
  comment,
}: {
  postId: string | number;
  cancelEdit: () => void;
  comment: IComment;
}) {
  const user = useAuth((state) => state.user);
  const form = useForm<commentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: comment.content,
    },
  });

  const { mutate: updateComment, isPending } = useUpdateComment(postId);

  function onSubmit(values: commentSchema) {
    updateComment({
      id: comment.id,
      content: values.content,
    });
    cancelEdit();
  }

  const content = form.watch("content");
  const isEmptyComment = !content?.trim();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        cancelEdit();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [cancelEdit]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormTextArea
          style={{
            resize: "none",
          }}
          control={form.control}
          name="content"
          placeholder="اضف تعليقك .... "
          onEnterSubmit={form.handleSubmit(onSubmit)}
          rightComponent={<UserAvatar />}
          leftComponent={
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="rounded-full bg-white disabled:cursor-not-allowed disabled:opacity-50"
                size="icon"
                type="submit"
                disabled={isEmptyComment}
              >
                {isPending ? <Spinner /> : <SendHorizonal size={14} />}
              </Button>
              <Button
                variant="outline"
                className="rounded-full bg-white"
                size="icon"
                type="button"
                onClick={cancelEdit}
              >
                <X size={14} />
              </Button>
            </div>
          }
          className="px-12 pt-3 pl-25"
        />
      </form>
    </Form>
  );
}
