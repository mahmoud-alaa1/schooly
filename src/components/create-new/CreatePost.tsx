"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import FormTextArea from "@/components/forms/FormTextArea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SendHorizonal } from "lucide-react";
import { commentSchema } from "@/schemas/commentsSchema";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/store/auth";
import useCreatePost from "@/hooks/posts/useCreatePost";
import { useParams } from "next/navigation";
import UserAvatar from "../UserAvatar";
export default function CreatePost() {
  const user = useAuth((state) => state.user);
  const { isPending, mutate } = useCreatePost();
  const form = useForm<commentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  const { classroomId } = useParams();

  function onSubmit(values: commentSchema) {
    mutate({
      content: values.content,
      classRoomId: classroomId as string,
    });
    form.reset();
  }

  const content = form.watch("content");
  const isEmptyComment = !content?.trim();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormTextArea
          dir="rtl"
          style={{
            resize: "none",
          }}
          control={form.control}
          name="content"
          placeholder="اضف تعليقك .... "
          onEnterSubmit={form.handleSubmit(onSubmit)}
          rightComponent={<UserAvatar />}
          leftComponent={
            <Button
              variant="outline"
              className="rounded-full bg-white disabled:cursor-not-allowed disabled:opacity-50"
              size="icon"
              type="submit"
              disabled={isEmptyComment}
            >
              {isPending ? <Spinner /> : <SendHorizonal size={14} />}
            </Button>
          }
          className="px-12 pt-3.5 pb-0"
        />
      </form>
    </Form>
  );
}
