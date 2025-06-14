"use client";

import { useState } from "react";
import CommentDisplay from "./CommentDisplay";
import CommentEdit from "./CommentEdit";
import { motion, AnimatePresence } from "framer-motion";

export default function CommentItem({
  comment,
  postId,
}: {
  comment: IComment;
  postId: string | number;
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {isEditing ? (
        <motion.div
          key="edit"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <CommentEdit
            postId={postId}
            cancelEdit={() => setIsEditing(false)}
            comment={comment}
          />
        </motion.div>
      ) : (
        <motion.div
          key="display"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <CommentDisplay
            onEdit={() => setIsEditing(true)}
            comment={comment}
            postId={postId}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
