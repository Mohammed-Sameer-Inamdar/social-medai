import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../../icons";
import { useCreatePostMutation, useGetPostsQuery, useUpdatePostMutation } from "../../slices/postSlice";
import './editpost.css'

const EditPost = () => {

    const { postId } = useParams();
    const { post,  error } = useGetPostsQuery('getPosts', {
        refetchOnMountOrArgChange: true,
        skip: false,
        selectFromResult: ({ data }) => ({
            post: data?.entities[postId],
        })
    })

    const [createPost, { isLoading: isCreateLoading }] = useCreatePostMutation();
    const [updatePost, { isLoading: isUpdatePostLoading }] = useUpdatePostMutation();

    const [title, setTitle] = useState(post?.title || '');
    const [description, setDescription] = useState(post?.content || '');
    const [erroeMessage, setErroeMessage] = useState(error);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { value, name } = event.target;
        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'description':
                setDescription(value);
                break;
            default:
                break;
        }
    }

    const handleSubmite = async (e) => {
        try {
            e.preventDefault();
            if (postId) {
                await updatePost({ id: postId, title, content: description, postId }).unwrap();
                navigate(`/posts/${postId}`);
            } else {
                const data = await createPost({ title, content: description }).unwrap();
                navigate(`/posts/${data.id}`);
            }
        } catch (err) {
            console.log(err);
            const message = err?.data?.message || "Something went wrong";
            setErroeMessage(message);
        }
    }

    return (
        <div className="container">
            <div className="edit-post-card">
                <h1>Post Details</h1>
                <form onSubmit={handleSubmite}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            value={title}
                            id="title"
                            name="title"
                            onChange={handleInputChange}
                            required />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input
                            value={description}
                            id="description"
                            name="description"
                            onChange={handleInputChange}
                            required />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p className="errorMessage">{erroeMessage}</p>
                        <button className="btn btn-primary" disabled={isCreateLoading || isUpdatePostLoading}>Save {(isCreateLoading || isUpdatePostLoading) && <Spinner tintColor={"#fff"} />}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditPost;