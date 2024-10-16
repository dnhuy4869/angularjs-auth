const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minLength: 6,
        maxLength: 50,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 255,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minLength: 3,
        maxLength: 60,
    },
    verificationCode: {
        type: String,
        default: null
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);