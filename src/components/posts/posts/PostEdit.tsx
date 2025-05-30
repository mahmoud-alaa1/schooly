"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { Form } from "@/components/ui/form";
import FormTextArea from "@/components/forms/FormTextArea";
import { Button } from "@/components/ui/button";
import { SendHorizonal, X } from "lucide-react";
import { commentSchema } from "@/schemas/commentsSchema";
import Spinner from "@/components/Spinner";
import useUpdatePost from "@/hooks/posts/useUpdatePost";

export default function PostEdit({
  post,
  cancelEdit,
}: {
  cancelEdit: () => void;
  post: IPost;
}) {
  const form = useForm<commentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: post.content,
    },
  });

  const { mutate: updatePost, isPending } = useUpdatePost();

  function onSubmit(values: commentSchema) {
    updatePost({
      id: post.id,
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
          placeholder="حدث تغييراتك هنا .... "
          onEnterSubmit={form.handleSubmit(onSubmit)}
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
          className="bg-gray-200/50 pl-24"
        />
      </form>
    </Form>
  );
}
