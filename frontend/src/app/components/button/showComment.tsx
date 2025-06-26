"use client";
import React from "react";
import { posts } from "@/app/object/post";

function ShowCommentsButton(props: any) {
  const { postUuid, toggleComments, showComments } = props;

  const post = posts.find((post) => post.uuid === postUuid);

  const comments = post?.comments;

  return (
    <div>
      <button
        type="button"
        className={`block text-gray-900 bg-gray-200 border border-gray-300 focus:outline-none border-transparent focus:border-transparent focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700`}
        onClick={toggleComments}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 inline-block mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          />
        </svg>
        {showComments ? `Comments (${comments?.length})` : `Show Comments (${comments?.length})`}
      </button>
    </div>
  );
}

export default ShowCommentsButton;
