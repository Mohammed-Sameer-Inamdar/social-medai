require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const credentials = require('./middleware/credentials');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const mongoose = require('mongoose');
const { errorHandler } = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const { authRouter } = require('./auth/authRouter');
const { postRouter } = require('./post/postRouter');

const PORT = process.env.PORT;
const app = express();

connectDB();
app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '/public')));

app.use(authRouter);
app.use(verifyJWT);
app.use(postRouter);


app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB ' + new Date());
    app.listen(PORT, () => console.log(`Server running on port ${PORT} ${new Date()}`));
});
