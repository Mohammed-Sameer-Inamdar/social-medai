import { api } from "./config";
// import {  createEntityAdapter } from "@reduxjs/toolkit";
// import axios from "axios";
// import { sub } from "date-fns";


export const postApi = api.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => '/posts',
        }),
        getPostsById: builder.query({
            query: (id) => `/posts${id}`,
        }),
        createPosts: builder.mutation({
            query: (newPost) => ({
                url: '/posts',
                method: 'POST',
                body: newPost,
            })
        }),
        updatePosts: builder.mutation({
            query: ({ id, ...postData }) => ({
                url: `/posts${id}`,
                method: 'POST',
                body: postData
            })
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE'
            })
        })
    })
})
export const { useGetPostsQuery, useGetPostsByIdQuery, useCreatePostsMutation, useUpdatePostsMutation, useDeletePostMutation } = postApi;


// const postAdapter = createEntityAdapter({});
// const initialPosts = postAdapter.getInitialState();
// {
//     posts: [],
//     status: 'idle', //idle | succeeded | failed
//     error: null
// }

// [{
//     id: '1',
//     title: 'First post ',
//     content: 'I have heard good things',
//     userId: '1',
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     reactions: {
//         thumbsup: 0,
//         wow: 0,
//         heart: 0,
//         rocket: 0,
//         coffee: 0
//     }
// }]

// export const fetchposts = createAsyncThunk('posts/fetchposts', async () => {
//     // try {
//     const response = await axios.get('http://localhost:3001/posts');
//     console.log('fetchposts ', response);
//     return response.data;
//     // } catch (err) {
//     // console.log(err);
//     // return err.message;
//     // }
// })

// export const createPost = createAsyncThunk('posts/createPost', async (postData) => {
//     try {
//         console.log('postData', postData);

//         const response = await axios.post('http://localhost:3001/posts', postData, {
//             headers: { "Authorization": `Bearer` },
//         });
//         console.log(response);
//         return response.data;
//     } catch (error) {
//         console.log(error);
//         // return error.message;
//     }
// })

// export const updatePost = createAsyncThunk('posts/updatePost', async (postData) => {
//     try {


//         const { postId } = postData;
//         const response = await axios.post('http://localhost:3001/posts/' + postId, postData);
//         return response.data
//     } catch (error) {
//         console.log(error);
//         // return error.message;
//     }
// })

// export const deletePost = createAsyncThunk('posts/deletePost', async ({ postId }) => {
//     try {
//         await axios.delete('http://localhost:3001/posts/' + postId);
//         return postId;
//     } catch (error) {
//         console.log(error);
//         // return error.message;
//     }
// })

//  createSlice({
//     name: 'posts',
//     initialState: initialPosts,
//     reducers: {
//         addPost: {
//             reducer(state, action) {
//                 state.posts.push(action.payload);
//             },
//             prepare(title, content, userId) {
//                 return {
//                     payload: {
//                         id: nanoid(),
//                         title,
//                         content,
//                         userId,
//                         reactions: {
//                             thumbsup: 0,
//                             wow: 0,
//                             heart: 0,
//                             rocket: 0,
//                             coffee: 0
//                         }
//                     }
//                 }
//             }
//         },
//         reactToPost(state, action) {
//             console.log('reactToPost', action.payload);

//             const { postId, reaction } = action.payload
//             state.posts.map(post => {
//                 if (post._id === postId) {
//                     post.reactions[reaction]++;
//                 }
//             });
//         }
//     },
//     extraReducers(builder) {
//         builder.addCase(fetchposts.pending, (state, action) => {
//             // state.status = 'loading';
//         }).addCase(fetchposts.fulfilled, (state, action) => {
//             // state.status = 'succeeded';
//             console.log('fetchpost action.payload', action.payload);
//             state.posts = action.payload;
//             console.log('state', state);

//         }).addCase(fetchposts.rejected, (state, action) => {
//             console.log('state', state);
//             // state.status = 'failed';
//             // state.error = action.error.message
//         }).addCase(createPost.fulfilled, (state, action) => {
//             console.log('createPost action.payload ', action.payload);
//             state.posts.push(action.payload);
//         }).addCase(updatePost.fulfilled, (state, action) => {
//             if (!action.payload?._id) {
//                 console.log('update not completed');
//                 console.log(action.payload);
//                 return;
//             }
//             const { _id } = action.payload;
//             const postList = state.posts.filter(post => post._id !== _id);
//             console.log('update posts', action.payload);
//             state.posts = [...postList, action.payload];
//             console.log(state.posts);

//         }).addCase(deletePost.fulfilled, (state, action) => {
//             if (!action.payload) {
//                 console.log('Failed to delete');
//                 console.log(action.payload);
//                 return;
//             }
//             const postList = state.posts.filter(post => post._id !== action.payload);
//             state.posts = postList;
//         })
//     }
// })

// export const allPosts = (state) => state.posts.posts
// // export const getPostsStatus = (state) => state.posts.status
// // export const getPostError = (state) => state.posts.error
// export const getPostById = (state, postId) => state.posts.posts.find(post => post._id === postId);
// export const { addPost, reactToPost } = postSlice.actions;
// export default postSlice.reducer;
