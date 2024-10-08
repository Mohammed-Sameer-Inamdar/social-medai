const allowedOrigins = [
    'http://127.0.0.1:3000',
    'http://localhost:3000'
]
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Credentials', true);
    }
    next();
}
module.exports = credentials;