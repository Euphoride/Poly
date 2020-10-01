/* -------------------------------------------------------------------------- */
/*                                 console.ts                                 */
/* -------------------------------------------------------------------------- */



/* --------------------------------- Imports -------------------------------- */

import express from 'express';
import mongoose from 'mongoose';
import cookieparser from 'cookie-parser';


import Logger from "./Logging/Logger";


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


// Listen
server.listen(SERVER_PORT, () => {
    mainLogger.log(SERVER_MSG);
})
