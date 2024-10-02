// userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    lastLogin: {
        type: Date,
        default: null,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    passwordResetToken: {
        type: String,
        default: null
    },
    passwordResetTokenExpires: {
        type: Date,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
},
{
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;