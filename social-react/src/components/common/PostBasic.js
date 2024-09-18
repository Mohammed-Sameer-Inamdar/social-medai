import React from "react";
import Author from "../posts/component/Author";
import PostTime from "../posts/component/PostTime";
import PostReactions from "../posts/component/PostReactions";
const PostBasic = ({ post,refetch }) => {
    return (
        <>
            <h3>{post?.title}</h3>
            <p>{post?.content?.substring(0, 100)}</p>
            <div className="flex flex-row justify-between items-center py-2">
                <Author author={post?.author} />
                <PostTime timestamp={post?.postCreated} />
            </div>
            <PostReactions post={post} refetch={refetch}/>
        </>
    )
}

export default PostBasic;