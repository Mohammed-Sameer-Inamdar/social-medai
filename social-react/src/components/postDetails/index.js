import React from "react";
import './post.css'
import PostBasic from '../common/PostBasic'
import { useParams } from "react-router-dom";
import { useGetPostsQuery } from "../../slices/postSlice";

const PostDetails = () => {
    const { postId } = useParams();
    const { post, isLoading,refetch } = useGetPostsQuery('getPosts', {
        refetchOnMountOrArgChange: true,
        skip: false,
        selectFromResult: ({ data }) => ({
            post: data?.entities[postId],
        })
    })
    if (isLoading) return <p>Loading...</p>
    if (!post) return <p>No post found</p>

    return (
        <div className="container">
            <div className='post-item'>
                <PostBasic post={post} refetch={refetch} />
            </div>
        </div>
    )
}

export default PostDetails;