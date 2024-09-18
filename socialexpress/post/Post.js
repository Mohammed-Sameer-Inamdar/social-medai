const mongoose = require('mongoose');

const PostModel = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
        },
        author: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        reactions: {
            wow: {
                type: Number,
                default: 0
            },
            heart: {
                type: Number,
                default: 0
            },
            rocket: {
                type: Number,
                default: 0
            },
            coffee: {
                type: Number,
                default: 0
            },
            thumsup: {
                type: Number,
                default: 0
            }
        }
    },
    {
        timestamps: {
            createdAt: 'postCreated',
            updatedAt: 'postUdpated'
        }
    },
    {
        toJSON: {
            virtuals: true,
            transform(doc, ret) {
                delete ret.__v
                ret.id = ret._id
                delete ret._id
            }
        }
    }
)

module.exports = mongoose.model('posts', PostModel);
