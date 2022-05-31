const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signToken = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

exports.signUp = async (req, res, next) => {
    try {
        console.log('i worked');
        console.log(req.body)
        const { FirstName, Password, LastName, Username } = req.body;
        const user = await User.findOne({ Username });
        if (user) {
            console.log(user)
            return res.status(401).json({
                status: "failed",
                message: "User already exist"
            });
        }

        const newUser = await User.create({
            FirstName: FirstName,
            Password: Password,
            LastName: LastName,
            Username: Username
        });

        const token = signToken(newUser._id);
        console.log(token);
        return res.status(201).json({
            status: "success",
            token,
            id: newUser._id,
            data: {
                user: newUser,
            },
        });
    } catch (error) {
        console.log(error);
        return;
    }
};

exports.logIn = async (req, res, next) => {
    const Username = req.body.Username;
    const Password = req.body.Password;

    const user = await User.findOne({ Username }).select("+Password");

    if (!user || !(await user.correctPassword(Password, user.Password))) {
        console.log("i worked3");

        return next(res.status(403));
    }

    console.log("i worked again");
    const token = signToken(user._id);
    res.status(200).json({
        status: "success",
        id: user._id,
        token,
    });
};