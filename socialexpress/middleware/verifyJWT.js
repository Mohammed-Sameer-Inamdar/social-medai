const jwt = require('jsonwebtoken');
const { sendResponse } = require('../utils/helper');

const verifyJWT = (req, res, next) => {
    const authorization = req.headers.authorization || req.headers.Authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) return sendResponse(res, 401, 'Access denied');
    const token = authorization.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return sendResponse(res, 403, 'Access denied');
            req.user = decoded;
            next();
        }
    )

}
module.exports = verifyJWT;