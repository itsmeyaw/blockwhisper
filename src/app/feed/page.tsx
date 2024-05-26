"use client";

import Card from "@/components/Card";
import { Text } from "@radix-ui/themes";
import { useState } from "react";

const posts = [
  {
    title: "This happened to me",
    description:
      "This is a description about a report. This is a description about a report.",
    upvote: 10,
    downvote: 2,
  },
  {
    title: "This happened to me",
    description:
      "This is a description about a report. This is a description about a report.",
    upvote: 10,
    downvote: 2,
  },
  {
    title: "This happened to me",
    description:
      "This is a description about a report. This is a description about a report.",
    upvote: 10,
    downvote: 2,
  },
];

const Feed = () => {
  return (
    <main
      className={
        "flex flex-col px-4 h-max justify-center items-center gap-12 self-center pb-20"
      }
    >
      <Text className="font-display">Most recent</Text>
      <div className="min-h-scren p-2 overflow-y-auto">
        {posts.map((post, index) => (
          <Card
            key={index}
            title={post.title}
            description={post.description}
            upvote={post.upvote}
            downvote={post.downvote}
          />
        ))}
      </div>
    </main>
  );
};

export default Feed;
