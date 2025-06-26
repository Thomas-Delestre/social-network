"use client";
import React, { useState } from "react";

function PostLikeButton() {
  let postIsLiked = false;
  let userCheckOwnProfile = false;

  const [isLiked, setIsLiked] = useState(postIsLiked);
  const [isHovered, setIsHovered] = useState(false);
  const [heartColor, setHeartColor] = useState({
    color: "none",
    border: "currentColor",
  });

  const handleClick = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      setHeartColor({ color: "red", border: "red" });
    } else {
      setHeartColor({ color: "none", border: "currentColor" });
    }
  };

  return (
    <div>
      {!userCheckOwnProfile && (
        <button
          type="button"
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`block mx-auto text-gray-900 bg-gray-200 border border-gray-300 focus:outline-none border-transparent focus:border-transparent focus:ring-0 font-medium rounded-lg text-sm px-5 pt-2 pb-1.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 ${
            isLiked
              ? "bg-gray-300 hover:bg-red-200 dark:hover:bg-red-200"
              : "hover:bg-gray-400 dark:hover:bg-gray-700"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={heartColor.color}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={heartColor.border}
            className="w-6 h-6 inline-block mr-1"
            style={{ marginBottom: "5px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>

          {isLiked ? (isHovered ? "UnLike" : "Liked") : "Like"}
        </button>
      )}
    </div>
  );
}

export default PostLikeButton;
