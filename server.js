//import libiek a packagov
const express = require("express"); //framework na pracu s requestami
const mongoose = require("mongoose"); //libka na spojenie sa s mongoDB
const cors = require("cors"); //dovoluje ostatnym strankam robit requesty na toto API
require("dotenv/config"); //prepojenie .env kde je link na connection s databazou so server.js

//pripojenie na db
mongoose.connect(
    process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) throw err;
        console.log("> Connected to DB");
    }
);

const app = express(); //cez app teraz viem pouzivat express

//middleware - zapnutie corsu a body-parseru (integrovany v expresse)
app.use(cors());
app.use(express.json());

//import routov
const loginRoute = require("./routes/route_login");
const registerRoute = require("./routes/route_register");
const verifyloginRoute = require("./routes/route_verifylogin");
const usersRoute = require("./routes/route_users");

//middleware na pouzivanie tychto externych routes
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/verifylogin", verifyloginRoute);
app.use("/users", usersRoute);

//server listener
port = process.env.port || 3000;
app.listen(port, (err) => {
    if (err) console.log(err);
    console.log("> Server running on port: ", port);
});