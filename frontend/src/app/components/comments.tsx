import React from "react";
import CommentForm from "./form/commentForm";
import { users } from "../object/user";
import { posts } from "../object/post";

const Comments = (props: any) => {
  const postUuid = props.postUuid;

  const post = posts.find((post) => post.uuid === postUuid);

  const comments = post?.comments;

  return (
    <>
      {comments && comments.length > 0 && (
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-64 h-px mb-8 bg-gray-200 border-0 dark:bg-gray-400" />
          <span className="absolute px-3 mb-8 font-medium text-gray-900 dark:text-white -translate-x-1/2 bg-white dark:bg-gray-800 left-1/2">
            Comment
          </span>
        </div>
      )}
      <div>
        {comments && comments.map((comment) => {
          const user_comment = users.find(
            (user) => user.uuid === comment.user_uuid
          );
          return (
            <p key={comment.uuid} className="mb-2">
              <a href={`/profile/${user_comment?.uuid}`}>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {user_comment?.firstName + " " + user_comment?.lastName}:{" "}
                </span>
              </a>
              <span className="text-gray-900 dark:text-white">
                {comment.content}
              </span>
            </p>
          );
        })}
        <CommentForm />
      </div>
    </>
  );
};

export default Comments;
