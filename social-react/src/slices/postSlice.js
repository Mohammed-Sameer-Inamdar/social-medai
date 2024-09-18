import { createEntityAdapter } from "@reduxjs/toolkit";
import { api } from "./apiSlice";

const postsAdapter = createEntityAdapter({})
const initialState = postsAdapter.getInitialState();
const postSlice = api.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => ({
                url: '/posts',
                method: 'GET'
            }),
            transformResponse: responseData => {
                return postsAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => [
                { type: 'Posts', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Posts', id }))
            ],
            keepUnusedDataFor: 0
        }),
        getpostByUser: builder.query({
            query: (userId) => `/posts?userId=${userId}`,
            transformResponse: responseData => {
                return responseData;
            },
            providesTags: (result, error, arg) => [
                ...result.ids.map(id => ({ type: 'Posts', id }))
            ]
        }),
        createPost: builder.mutation({
            query: postData => ({
                url: '/posts',
                method: 'POST',
                body: postData
            }),
            invalidatesTags: [
                { type: 'Posts', id: "LIST" }
            ]
        }),
        updatePost: builder.mutation({
            query: postData => ({
                url: `/posts/${postData.id}`,
                method: 'POST',
                body: postData
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Posts', id: arg.id }
            ]
        }),
        deletePost: builder.mutation({
            query: ({ id }) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Posts', id: arg.id }
            ]
        }),
        reactToPost: builder.mutation({
            query: ({ postId, reactions }) => ({
                url: `/posts/${postId}/reactions`,
                method: 'POST',
                body: reactions
            }),
            async onQueryStarted({ postId, reactions }, { dispatch, queryFulfilled }) {
                const updatePost = dispatch(postSlice.util.updateQueryData('getPosts', 'getPosts', draft => {
                    const post = draft.entities[postId];
                    if (post) post.reactions = reactions;
                }));
                try {
                    await queryFulfilled

                } catch {
                    updatePost.undo();
                }
            }
        })
    })
})

export const { useGetPostsQuery, useGetpostByUserQuery, useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation, useReactToPostMutation } = postSlice;

