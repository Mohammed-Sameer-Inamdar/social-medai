const sendResponse = (res, status, message, data = null) => {
    if (status !== 200 && !data) {
        data = { 'message': message };
    }
    // res.statusCode = status;
    res.statusMessage = message;
    return res.status(status).json(data);
}

module.exports = { sendResponse };