const authMethods = require('./auth.methods.js');

const verifyToken = (req, res, next) => {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
        return res.status(401).json({
            message: "Unauthorized",
        })
    }

    const decodedToken = authMethods.verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (!decodedToken) {
        return res.status(401).json({
            invalidToken: true,
            message: "Unauthorized",
        })
    }

    const tokenData = {
        username: decodedToken.payload.username,
        role: decodedToken.payload.role,
    }

    req.tokenData = tokenData;
    next();
};

module.exports = {
    verifyToken
}