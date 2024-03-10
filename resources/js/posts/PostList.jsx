import React from 'react';
import PostItem from "./PostItem";

const PostList = ({posts}) => {
    return (
        <div className="flex flex-col items-center justify-center">
            {posts.map((post) => {
                return <PostItem key={post.id} item={post}/>
            })}
        </div>
    );
};

export default PostList;
