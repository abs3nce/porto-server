const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/model_user");

router.post("/", (req, res, next) => {
    console.log(`\n>> USER DATA TO REGISTER:\n`, req.body);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    });
    console.log(`\n>> USER DATA READY TO STORE:\n`, newUser);

    newUser.save((err) => {
        if (err)
            //error nastane pokial pouzite username alebo email uz je aspon raz zapisany v DB
            //tento parameter ze username a email musia byt jedinecne je zapisany v user modeli model_user.js
            //nasledne vyhod status 400 (Bad Request) a posli data erroru na fronend
            return res.status(400).json({
                title: "Username or email already exists",
                err: err,
                user: newUser,
            });
        //pokial registracia prebehla uspesne tak sreturni status 200 (OK) a navrat data na frontend
        return res.status(200).json({
            title: "Registration sucessfull",
            user: newUser,
        });
    });

    console.log(`\n>> USER DATA STORED`);
});

module.exports = router;
