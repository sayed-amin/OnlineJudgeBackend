const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        default: null,
        required: true,
    },
    lastname: {
        type: String,
        default: null,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin", "problem_creator", "contest_creator"],  // Role options
        default: "user",  // Default role assigned at registration
    },
    createdAt: {
        type: Date,
        default: Date.now,  // Automatically set the registration date
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
