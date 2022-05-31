const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    FirstName: {
        type: String,
        lowercase: true,
    },
    Password: {
        type: String,
        require: [true, "Please provide a password"],
        minlength: 8,
        select: false,
    },
    Username: {
        type: String,
        require: [true, "Please provide a username"],
        minlength: 3,
        select: false,
    },
    LastName: {
        type: String,
        require: [true, "Please provide your name"],
        minlength: 3,
        select: false,
    },
});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre("save", async function (next) {
    this.Password = await bcrypt.hash(this.Password, 10);

    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;