const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema(
    {
        username: {
            type: String,
            required: true
        },
        role: {
            type: Number,
            default: 2
        },
        password: {
            type: String,
            required: true
        },
        token: {
            type: [String]
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

module.exports = mongoose.model('User', userSchema);