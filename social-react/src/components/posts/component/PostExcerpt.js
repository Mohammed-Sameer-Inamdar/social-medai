import React from "react";
import { Link } from "react-router-dom";
import { useGetPostsQuery, useDeletePostMutation } from "../../../slices/postSlice";
import PostBasic from "../../common/PostBasic";
import { Spinner } from "../../../icons";

const PostExcerpt = ({ postId }) => {
    const { post, refetch } = useGetPostsQuery('getPosts', {
        refetchOnMountOrArgChange: true,
        skip: false,
        selectFromResult: ({ data }) => ({
            post: data?.entities[postId],
        })
    })

    const [deletePost, { isLoading }] = useDeletePostMutation();

    const onDelete = async (postId) => {
        try {
            await deletePost({ id: postId }).unwrap();
            refetch();

        } catch (err) {
            console.log('delete post', err);
        }
        // dispatch(deletePost({ postId })).unwrap();
    }

    return (
        <div className='post-item'>
            <PostBasic post={post} refetch={refetch} />
            <div className='postCredit'>
                <Link className='mr-2' to={`/posts/${postId}`}>View Post</Link>
                <Link className='mr-2' to={`/posts/edit/${postId}`}>Edit Post</Link>
                <Link className='mr-2 text-danger' onClick={() => onDelete(post.id)}>Delete Post {isLoading && <Spinner />}</Link>
            </div>
        </div>
    )
}
export default PostExcerpt;