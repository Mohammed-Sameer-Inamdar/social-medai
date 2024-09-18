const express = require('express');
const { postsList, updatePost, createPost, deletePost } = require('./postController');

const postRouter = express.Router();

postRouter.get('/posts', postsList);
postRouter.post('/posts/:id', updatePost);
postRouter.post('/posts', createPost);
postRouter.delete('/posts/:id', deletePost);

module.exports = { postRouter };