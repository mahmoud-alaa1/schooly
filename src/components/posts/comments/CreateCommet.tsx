"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import FormTextArea from "@/components/forms/FormTextArea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SendHorizonal } from "lucide-react";
import { commentSchema } from "@/schemas/commenSchema";
import useCreateComment from "@/hooks/comments/useCreateComment";

export default function CreateCommet({ postId }: { postId: string | number }) {
  const form = useForm<commentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  const { mutate: createComment } = useCreateComment(postId);

  function onSubmit(values: commentSchema) {
    createComment({
      content: values.content,
      postId,
    });
    form.reset();
  }

  const content = form.watch("content");
  const isEmptyComment = !content?.trim();

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
          rightComponent={
            <div className="relative size-8 rounded-full bg-orange-500">
              <Image
                src="/person1.png"
                alt={"your avatar"}
                fill
                className="rounded-full object-cover"
              />
            </div>
          }
          leftComponent={
            <Button
              variant="outline"
              className="rounded-full bg-white disabled:cursor-not-allowed disabled:opacity-50"
              size="icon"
              type="submit"
              disabled={isEmptyComment}
            >
              <SendHorizonal size={14} />
            </Button>
          }
          className="px-12 pt-3"
        />
      </form>
    </Form>
  );
}
