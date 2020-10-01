/* -------------------------------------------------------------------------- */
/*                                 console.ts                                 */
/* -------------------------------------------------------------------------- */



/* --------------------------------- Imports -------------------------------- */

import express from 'express';
import mongoose from 'mongoose';
import cookieparser from 'cookie-parser';


import Logger from "./Logging/Logger";

import extract  from "./Routes/informationExtractor";
import prep     from "./Routes/RequestPrep";
import Requests from "./Routes/Requests";

import makeAccount from "./Authentication/Account/MakeAccount";
import checkAccount from "./Authentication/Account/CheckAccount";

import pushToken from "./Authentication/Token/PushToken";


/* --------------------------------- Set up --------------------------------- */

// Start Logging Instance
const mainLogger = new Logger("Main");

// Start Server Instance
const server = express();

// JSON Parsing
server.use(express.json());

// Server Information
const SERVER_PORT : number = 5000;
const SERVER_MSG  : string = "Server online :) Currently listening on port " + SERVER_PORT.toString();


/* ----------------------------- Routing Set Up ----------------------------- */

// A quick route on /
server.post("/", function (req, res) {
    console.log(req.body);

    res.json(req.body);
    res.end();
})


/* -------------------------------- Start up -------------------------------- */

let dbInterface = new Requests({
    MongoosePath: "NHS"
})


server.route("/Account/Make").post(async function (req, res) {
    let username: string = req.body.bundle.username;
    let password: string = req.body.bundle.password;
    let type    : string = req.body.bundle.type;

    let response = await makeAccount(username, password, type);
    response = response || "Account successfully made!";

    res.json({
        message: response
    });
});

server.route("/Token/Push").post(async function(req, res) {
    let username: string = req.body.bundle.username;
    let password: string = req.body.bundle.password;
    let browserID: string = req.body.bundle.browserID;

    let accountExists = await checkAccount(username, password);

    if (accountExists) {
        let token = await pushToken(browserID, username);

        res.json({
            token: token
        });
    } else {
        res.json({
            message: "Account doesn't exist"
        })
    }
});




// Listen
server.listen(SERVER_PORT, () => {
    mainLogger.log(SERVER_MSG);
})
