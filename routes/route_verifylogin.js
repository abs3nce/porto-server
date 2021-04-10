const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/model_user");

router.get("/", (req, res, next) => {
    let token = req.headers.token; //tuto ziskavam vlastne token z clienta

    jwt.verify(
        token,
        "mojsupermegaultragigatutifrutisecretkey",
        (err, decoded) => {
            //pokial nie je token validny tak rejectni request s tym ze uzivatel nie je opravneny
            if (err)
                return res.status(401).json({
                    title: "Unauthorized access, please sign in",
                    error: err,
                });

            //pokial je token valid tak preposli na clienta spravne data o uzivatelovi
            User.findOne({ _id: decoded.userID }, (err, user) => {
                if (err)
                    return res.status(401).json({ title: "User not verified" });
                return res.status(200).json({
                    title: "User info",
                    userData: { username: user.username, _id: user._id },
                });
            });
        }
    );
});

module.exports = router;
