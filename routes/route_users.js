const express = require("express");
const router = express.Router();
const User = require("../models/model_user");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
    //najdi vsetkych userov v db a postupne ich zapis do allUsers, ktore nasledne posles na klienta
    User.find({}, function (err, users) {
        if (err)
            return res.status(500).json({ title: "Server error", error: err });

        var allUsers = {};

        users.forEach(function (user) {
            //do allUsers[id usera] pripis username usera a aj jeho _id
            allUsers[user._id] = user;
            //{ username: user.username, _id: user._id }
            /* 
                zatial budem posielat celeho usera ale ked uz bude appka skoro hotova tak nebude
                uz treba posielat vsetky data na clienta a teda budem potom posielat uz iba potrebne,
                len este stale neviem kolko budem ku koncu posielat dat takze 
                zatial budem preposielat cely user object
            */
        });

        //nasledne predchadzajuce udaje posli na clienta
        res.send(allUsers);
    });
});

router.get("/:username", (req, res, next) => {
    User.findOne({ username: req.params.username }, (err, user) => {
        if (err)
            return res.status(500).json({ title: "Server error", error: err });

        if (!user) return res.status(500).json({ title: "User not found" });

        res.status(200).json({
            title: "User found",
            userData: user,
            //sem pripisat ostatne data ktore treba poslat na clienta { username: user.username, _id: user._id }
            //zatial budem posielat celeho usera
        });
    });
});

module.exports = router;
