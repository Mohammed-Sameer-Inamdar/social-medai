// const mongoos = require("mongoose");
const { sendResponse } = require("../utils/helper");
const Post = require("./Post");

const postsList = async (req, res) => {

    const postsList = await Post.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'postAuthor'
            }
        },
        { $unwind: '$postAuthor' },
        { $sort: { postCreated: -1 } },
        {
            $project: {
                id: "$_id",
                _id: 0,
                title: 1,
                content: 1,
                postCreated: 1,
                reactions: 1,
                author: '$postAuthor'
            }
        }
    ]);
    return sendResponse(res, 200, 'Searching success', postsList);
}

const createPost = async (req, res) => {
    const { title, content } = req.body;
    if (!title) return sendResponse(res, 400, 'Title is required');

    const newPost = await Post.create({ title, content, author: req.user.id });

    return sendResponse(res, 200, 'Post created successfully', newPost);

}

const updatePost = async (req, res) => {
    const { id } = req.params;
    if (!id) return sendResponse(res, 400, 'Post id is required');

    const { title, content, reactions } = req.body;
    let updateData = {};
    if (title) {
        updateData['title'] = title;
    }
    if (content) {
        updateData['content'] = content;
    }
    if (reactions) {
        updateData['reactions'] = reactions;
    }
    const newPostData = await Post.findByIdAndUpdate(id, updateData, { new: true, returnNewDocument: true });
    return sendResponse(res, 200, 'Updated successfully', newPostData);
}

const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!id) return sendResponse(res, 400, 'Id is required');
    await Post.findByIdAndDelete(id);
    return sendResponse(res, 200, 'Deleted successfully', { postId: id });
}


module.exports = { postsList, createPost, updatePost, deletePost };
