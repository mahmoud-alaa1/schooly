import React from "react";
import Post from "./Post";

export default function Posts() {
  return (
    <div className="flex flex-col gap-4">
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}
