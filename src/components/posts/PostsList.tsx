"use client";

import useGetAllPosts from "@/hooks/posts/useGetAllPosts";
import PostItem from "./PostItem";
import PostSkeleton from "./PostSkeleton";
import { POSTS_PER_PAGE } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";

export default function PostsList() {
  const { data, isFetching, ref, hasNextPage } = useGetAllPosts();
  const posts = data?.pages.flatMap((page) => page.data);

  return (
    <AnimatePresence mode="popLayout">
      <motion.div layout className="flex h-fit! flex-col gap-4">
        {posts?.map((post, index) => (
          <motion.div
            key={post.id}
            ref={index === posts.length - 1 ? ref : undefined}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            transition={{
              duration: 0.3,
              delay: index * 0.1,
              layout: { duration: 0.3 },
            }}
            layout="position"
          >
            <PostItem post={post} />
          </motion.div>
        ))}
        {isFetching && (
          <>
            {Array.from({ length: POSTS_PER_PAGE }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <PostSkeleton />
              </motion.div>
            ))}
          </>
        )}
        {!hasNextPage && (
          <div className="flex items-center justify-center rounded-2xl bg-white p-6">
            <p className="text-muted-foreground">لا توجد منشورات اخرى لعرضها</p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
