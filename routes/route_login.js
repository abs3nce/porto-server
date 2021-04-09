const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/model_user");

router.post("/", (req, res, next) => {
    console.log(`\n>> USER DATA TO LOGIN:\n`, req.body);

    //podla dat z prihlasenia skus user prihlasit
    User.findOne({ username: req.body.username }, (err, user) => {
        //pokial nastala nejaka chyba serveru alebo databazy
        if (err)
            return res
                .status(500)
                .json({ title: "Server or Database error", error: err });

        //pokial user s menom z requestu neexistuje (cize neexistuje)
        if (!user) {
            return res.status(401).json({
                title: "User not found",
                error: "Invalid credentials",
            });
        }

        //pokial bol user najdeny ale heslo je zadane zle
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: "Unauthorized access",
                error: "Invalid credentials",
            });
        }

        //pokial sa user nasiel a heslo je spravne tak vygeneruj jwt ktory posles na FE
        let token = jwt.sign(
            { userID: user._id },
            "mojsupermegaultragigatutifrutisecretkey"
        );
        res.status(200).json({ title: "Login successful", token: token });
    });
});

module.exports = router;
