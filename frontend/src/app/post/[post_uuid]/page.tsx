import React from "react";
import Post from "../../components/post";
import { posts } from "../../object/post";

const PostPage = (props: any) => {
  const post_uuid = props.params.post_uuid;

  const post = posts.find((post) => post.uuid === post_uuid);

  if (post === undefined)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen relative">
        <span className="text-3xl font-bold">Post not found</span>
        <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt=""
        />
      </div>
    );

  return (
    <div className="container mx-auto md:w-1/3 py-8">
      <h1 className="text-3xl font-bold mb-4">Social Network</h1>
      <Post
        key={post.uuid}
        uuid={post.uuid}
        user_uuid={post.user_uuid}
        content={post.content}
        type={post.type}
        date={post.date}
        imageUrl={post.imageUrl}
        comments={post.comments}
      />
    </div>
  );
};

export default PostPage;
