const express = require("express");
const router = express.Router();
const User = require("../models/model_user");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
    User.find({}, function (err, users) {
        if (err)
            return res.status(500).json({ title: "Server error", error: err });

        var allUsers = {};

        users.forEach(function (user) {
            allUsers[user._id] = user;
        });

        res.send(allUsers);
    });
});

router.get("/:username", (req, res, next) => {
    User.findOne({ username: req.params.username }, (err, user) => {
        if (err)
            return res.status(500).json({ title: "Server error", error: err });
        if (!user) return res.status(500).json({ title: "User not found" });
        res.status(200).json({ title: "User found", user: user });
    });
});

module.exports = router;
