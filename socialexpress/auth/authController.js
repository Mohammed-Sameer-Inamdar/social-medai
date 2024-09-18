const jwt = require("jsonwebtoken");
const { sendResponse } = require("../utils/helper");
const User = require("./User");

const login = async (req, res) => {
    const cookeies = req.cookeies;

    const { username, password } = req.body;
    if (!username || !password) return sendResponse(res, 400, 'Username and passowrd are required');

    const userData = await User.findOne({ username });

    if (!userData || userData.password !== password) return sendResponse(res, 400, 'Invalid username and password');

    const accessToken = jwt.sign({
        id: userData._id,
        username: username,
        role: userData.role
    },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' }
    );

    const refreshToken = jwt.sign(
        {
            id: userData._id,
            username: username,
            role: userData.role
        },
        process.env.REFRESHTOKEN_SECRET,
        { expiresIn: '1w' }
    );

    const newRefreshTokens = !cookeies?.jwt ? userData.refreshToken || [] : userData.refreshToken.filter(token => token !== cookeies.jwt);
    if (cookeies?.jwt) {
        const cookiesToken = cookeies.jwt;
        const tokenExists = await User.findOne({ token: cookiesToken });

        if (!tokenExists) {
            newRefreshTokens = [];
        }

        res.clearCookies('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    }

    userData.refreshToken = [...newRefreshTokens, refreshToken];
    await userData.save();

    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });

    return sendResponse(res, 200, 'Logged in successfully', { user: { username }, token: accessToken });

}

const signUp = async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) return sendResponse(res, 400, 'User name and password is required');
    const usernameExists = await User.findOne({ username: username });
    if (usernameExists) return sendResponse(res, 400, 'User name already used');
    await User.create({ username: username, email: email, password: password });
    const userData = await User.findOne({ username: username }).select('username roles password email').exec();
    return sendResponse(res, 201, 'Signed up successfully', userData).exec();
}

module.exports = { login, signUp };