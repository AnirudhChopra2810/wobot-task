const express = require("express");
const Product = require("../model/productModel");
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.addProduct = async (req, res) => {
    try {
        console.log(req.headers);
        const token = req.headers.authorization.split(" ")[1];

        console.log(token);
        const verify = await jwt.verify(JSON.parse(token), process.env.JWT_SECRET);

        if (!verify) return res.send("invalid Token");

        const user = await User.findOne({ _id: verify.id });

        if (!user) return res.send("User not found");

        console.log(req.body)

        const Data = req.body.product;

        Data.map(async (el) => {

            console.log(el.name);

            const product = await Product.create({
                Name: el.name,
                Quantity: el.quantity,
                Description: el.description,
                Price: el.price,
                _createdBy: Date.now()
            });


        })



        return res.send({ success: true, message: "List added successfully" }); // default status is 200
    } catch (error) {
        console.log(error);
        return res.status(500).send("Oops something broke! :(");
    }
};


exports.getProduct = async (req, res) => {
    try {
        console.log(req.headers);
        const token = req.headers.authorization.split(" ")[1];

        console.log(token);
        const verify = await jwt.verify(JSON.parse(token), process.env.JWT_SECRET);

        console.log(verify.id);

        if (!verify) return res.send("invalid Token");

        const user = await User.findOne({ _id: verify.id });

        if (!user) return res.send("User not found");

        const product = await Product.find({ Key: verify.id });

        res.send({
            Product: product,
            id: verify.id,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Oops something broke! :(");
    }
};