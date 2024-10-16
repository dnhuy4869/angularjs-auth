const UserModel = require("../user/user.model.js");
const bcrypt = require('bcrypt');
const authMethods = require("./auth.methods.js");

const ACCESS_TOKEN_LIFE = "10s";
const REFRESH_TOKEN_LIFE = "1d";

const login = async (req, res) => {
    try {

        const data = {
            username: req.body.username,
            password: req.body.password,
        }

        const user = await UserModel.findOne({
            username: data.username,
        });

        if (!user) {
            return res.status(404).json({
                message: "Invalid user",
            })
        }

        const validPassword = await bcrypt.compare(data.password, user.password);
        if (!validPassword) {
            return res.status(404).json({
                message: "Incorrect password",
            })
        }

        // generate token
        const tokenData = {
            username: user.username,
        }

        const accessToken = authMethods.generateToken(
            tokenData,
            process.env.ACCESS_TOKEN_SECRET,
            ACCESS_TOKEN_LIFE
        );
        const refreshToken = authMethods.generateToken(
            tokenData,
            process.env.REFRESH_TOKEN_SECRET,
            REFRESH_TOKEN_LIFE
        );

        if (!accessToken || !refreshToken) {
            return res.status(401).json({
                message: "Token generation failed",
            })
        }

        res.cookie("refreshToken", refreshToken, {
            httpOnly: false,
        })

        return res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: accessToken,
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err,
        })
    }
};

const register = async (req, res) => {
    try {

        const data = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
        };

        // check if user is already exist
        const userByUsername = await UserModel.findOne({ username: data.username });
        const userByEmail = await UserModel.findOne({ email: data.email });

        if (userByUsername) {
            return res.status(409).json({
                message: "Username is already exist",
            });
        }

        if (userByEmail) {
            return res.status(409).json({
                message: "Email is already exist",
            });
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(data.password, salt);

        data.password = hashedPassword;

        const newUser = await new UserModel(data);
        await newUser.save();

        return res.status(200).json({
            message: "Registered successfully",
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err,
        })
    }
};

const refresh = async (req, res) => {
    try {

        if (!req.cookies) {
            return res.status(400).json({
                message: "Bad request",
            })
        }

        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            console.log("No refresh token");

            return res.status(401).json({
                message: "Unauthorized",
            })
        }

        const decodedToken = authMethods.verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (!decodedToken) {
            return res.status(401).json({
                message: "Unauthorized",
            })
        }

        const tokenData = {
            username: decodedToken.payload.username,
        }

        const accessToken = authMethods.generateToken(
            tokenData,
            process.env.ACCESS_TOKEN_SECRET,
            ACCESS_TOKEN_LIFE
        );

        if (!accessToken) {
            return res.status(401).json({
                message: "Token generation failed",
            })
        }

        return res.status(200).json({
            tokenData: tokenData,
            accessToken: accessToken,
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err,
        })
    }
}

const logout = async (req, res) => {
    try {

        res.clearCookie("refreshToken");

        return res.status(200).json({
            message: "Logged out successfully",
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err,
        })
    }
}

module.exports = {
    login,
    register,
    refresh,
    logout,
};