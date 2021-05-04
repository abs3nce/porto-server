const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/model_user");

router.get("/", (req, res, next) => {
    let token = req.headers.token; //tuto ziskavam vlastne token z clienta
    console.log("\n>> REQUEST TO VERIFY LOGIN:\n", token + "\n");

    jwt.verify(
        token,
        "mojsupermegaultragigatutifrutisecretkey",
        (err, decoded) => {
            //pokial nie je token validny tak rejectni request s tym ze uzivatel nie je opravneny
            if (err) {
                console.log(">> USER TOKEN INVALID\n");
                return res.status(401).json({
                    title: "Unauthorized access, please sign in",
                    description: "Invalid user token",
                    error: err,
                });
            }

            console.log(">> USER TOKEN VALID\n");
            //pokial je token valid tak preposli na clienta spravne data o uzivatelovi
            User.findOne({ _id: decoded.userID }, (err, user) => {
                if (err) return res.status(500).json({ title: "Server error" });

                console.log(">> USER FOUND:\n", user);
                return res.status(200).json({
                    title: "User info",
                    userData: { username: user.username, _id: user._id },
                });
            });
        }
    );
});

module.exports = router;
