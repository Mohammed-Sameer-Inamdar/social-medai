const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.DATABASE_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    mongoose.set('toJSON', {
        virtuals: true,
        transform: (doc, converted) => {
            converted.id = converted._id
            delete converted._id;
        }
    });
}
module.exports = connectDB;