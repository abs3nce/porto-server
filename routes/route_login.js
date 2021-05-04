const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/model_user");

router.post("/", (req, res, next) => {
    console.log(`\n>> USER DATA TO LOGIN:\n`, req.body);

    //skus najst usera v DB ktory ma zhodne meno s menom z loginu
    User.findOne({ username: req.body.username }, (err, user) => {
        //pokial nastala nejaka chyba serveru alebo databazy pri hladani
        if (err)
            return res
                .status(500)
                .json({ title: "Internal Server Error", error: err });

        //pokial user s menom z loginu v DB neexistuje
        if (!user)
            return res
                .status(401)
                .json({
                    title: "User not found",
                    error: "Invalid credentials",
                });

        //pokial sa tento user v DB nasiel ale zadane heslo je zle
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: "Unauthorized access",
                error: "Invalid credentials",
            });
        }

        //pokial sa tento user nasiel a heslo je spravne tak vygeneruj jwt ktory posles na clienta aj s menom uzivatela a jeho ID
        let token = jwt.sign({ userID: user._id },
            "mojsupermegaultragigatutifrutisecretkey"
        );

        res.status(200).json({
            title: "Login successful",
            userData: { username: user.username, _id: user._id, token: token },
        });
    });
});

module.exports = router;