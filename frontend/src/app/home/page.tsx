import React from 'react';
import Post from '../components/post';
import { posts } from '../object/post';

const Home = () => {


  return (
    <div className="container mx-auto md:w-1/3 py-8">
      <h1 className="text-3xl font-bold mb-4">Social Network</h1>
      {posts.toReversed().map(post => (
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
      ))}
    </div>
  );
};

export default Home;
