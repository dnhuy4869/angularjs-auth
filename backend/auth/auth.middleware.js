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
            requireRefresh: true,
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

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.tokenData.role === "admin") {
            next();
        }
        else {
            return res.status(403).json({
                message: "You don't have permission to do this action"
            });
        }
    })
};

const verifyCustomer = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.tokenData.role === "admin" || req.tokenData.role === "customer") {
            next();
        }
        else {
            return res.status(403).json({
                message: "You don't have permission to do this action"
            });
        }
    })
}

module.exports = {
    verifyAdmin,
    verifyCustomer,
}