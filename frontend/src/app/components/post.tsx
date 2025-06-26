"use client";
import React, { useState } from "react";
import { users } from "../object/user";
import PostLikeButton from "./button/postLike";
import ShareButton from "./button/share";
import ShowCommentsButton from "./button/showComment";
import Comments from "./comments";

interface Comment {
  uuid: string;
  user_uuid: string;
  content: string;
}

interface PostProps {
  uuid: string;
  user_uuid: string;
  content: string;
  type?: string;
  imageUrl?: string;
  date: string;
  comments: Comment[];
}

const Post: React.FC<PostProps> = ({
  uuid,
  user_uuid,
  content,
  type,
  date,
  imageUrl,
  comments,
}) => {
  const user_post = users.find((user) => user.uuid === user_uuid);
  const defaultAvatarUrl =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    if (!showComments) {
      setShowComments((prev) => !prev);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 my-4 border rounded-lg">
      <div className="flex items-center mb-4">
        <a href={`/profile/${user_post?.uuid}`} className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-2"
            src={
              user_post?.avatar.length !== 0
                ? user_post?.avatar
                : defaultAvatarUrl
            }
            alt={`${user_post?.firstName} ${user_post?.lastName} Avatar`}
          />
          <div>
            <p className="font-bold text-gray-900 dark:text-white">
              {user_post?.firstName + " " + user_post?.lastName}
              {type && (
                <span className="ml-2 bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                  {type}
                </span>
              )}
            </p>
          </div>
        </a>
        <div className="ml-auto">
          <div>
            <p className="font-bold text-gray-900 dark:text-white">
              {date ? new Date(date).toLocaleDateString("fr-FR") : ""}
            </p>
          </div>
        </div>
      </div>
      <p className="mb-4 text-gray-900 dark:text-white">{content}</p>
      {imageUrl && (
        <img src={imageUrl} alt="Post" className="w-full mb-1 rounded-lg" />
      )}
      <div className="flex justify-between">
        <div className="items-start">
          <PostLikeButton />
        </div>
        <div>
          <ShowCommentsButton
            postUuid={uuid}
            toggleComments={toggleComments}
            showComments={showComments}
          />
        </div>
        <div className="items-end">
          <ShareButton postUuid={uuid} />
        </div>
      </div>
      {showComments && <Comments postUuid={uuid} />}
    </div>
  );
};

export default Post;
