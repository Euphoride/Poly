/* -------------------------------------------------------------------------- */
/*                                 console.ts                                 */
/* -------------------------------------------------------------------------- */



/* --------------------------------- Imports -------------------------------- */

import express      from 'express';
import mongoose     from 'mongoose';
import cookieparser from 'cookie-parser';


import Logger from "./Logging/Logger";

import extract  from "./Routes/informationExtractor";
import prep     from "./Routes/RequestPrep";
import Requests from "./Routes/Requests";

import makeAccount  from "./Authentication/Account/MakeAccount";
import checkAccount from "./Authentication/Account/CheckAccount";
import pushToken    from "./Authentication/Token/PushToken";
import unpack       from "./Authentication/Border/Unpack";
import crossRefTok  from "./Authentication/Token/CrossRef";
import accountRef   from "./Authentication/Account/AccountRef";
import Access       from "./Authentication/Access Control/Access";


import {Accounts, Tokens, StaffProfiles, PatientProfiles, patientTests, testInformation} from "./Schemas/Schemas";


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
});


/* --------------------------- Access Definitions --------------------------- */

let AccessObject = new Access();

AccessObject.load("./Authentication/Access Control/Table.json");

// Account stuff
AccessObject.addRequestRoute("/Account/Delete");
AccessObject.addAction("test", "/Account/Delete", "global");


// Staff Profiles
AccessObject.addRequestRoute("/StaffProfile/Make");
AccessObject.addAction("Staff", "/StaffProfile/Make", "self");
AccessObject.addAction("Admin", "/StaffProfile/Make", "global");

AccessObject.addRequestRoute("/StaffProfile/Find");      
AccessObject.addAction("Admin", "/StaffProfile/Find", "global");

AccessObject.addRequestRoute("/StaffProfile/Modify");
AccessObject.addAction("Staff", "/StaffProfile/Modify", "self");
AccessObject.addAction("Admin", "/StaffProfile/Modify", "global");

AccessObject.addRequestRoute("/StaffProfile/Delete");
AccessObject.addAction("Staff", "/StaffProfile/Delete", "self");
AccessObject.addAction("Admin", "/StaffProfile/Delete", "global");


// Patient Profiles
AccessObject.addRequestRoute("/PatientProfile/Make");
AccessObject.addAction("Patient", "/PatientProfile/Make", "self");
AccessObject.addAction("Admin", "/PatientProfile/Make", "global");

AccessObject.addRequestRoute("/PatientProfile/Find");
AccessObject.addAction("Staff", "/PatientProfile/Find", "global");
AccessObject.addAction("Admin", "/PatientProfile/Find", "global");

AccessObject.addRequestRoute("/PatientProfile/Modify");
AccessObject.addAction("Patient", "/PatientProfile/Modify", "self");
AccessObject.addAction("Admin", "/PatientProfile/Modify", "global");

AccessObject.addRequestRoute("/PatientProfile/Delete");
AccessObject.addAction("Patient", "/PatientProfile/Delete", "self");
AccessObject.addAction("Admin", "/PatientProfile/Delete", "global");


// Patient Test Records (NHSNumber / Test)
AccessObject.addRequestRoute("/PatientTestRecord/Make");
AccessObject.addAction("Staff", "/PatientTestRecord/Make", "global");
AccessObject.addAction("Admin", "/PatientTestRecord/Make", "global");

AccessObject.addRequestRoute("/PatientTestRecord/Find");
AccessObject.addAction("Patient", "/PatientTestRecord/Find", "self");
AccessObject.addAction("Staff", "/PatientTestRecord/Find", "global");
AccessObject.addAction("Admin", "/PatientTestRecord/Find", "global");

AccessObject.addRequestRoute("/PatientTestRecord/Modify");
AccessObject.addAction("Staff", "/PatientTestRecord/Modify", "global");
AccessObject.addAction("Admin", "/PatientTestRecord/Modify", "global");

AccessObject.addRequestRoute("/PatientTestRecord/Delete");
AccessObject.addAction("Staff", "/PatientTestRecord/Delete", "global");
AccessObject.addAction("Admin", "/PatientTestRecord/Delete", "global");

// Patient Test Information
AccessObject.addRequestRoute("/PatientTestInformation/Make");
AccessObject.addAction("Staff", "/PatientTestInformation/Make", "global");
AccessObject.addAction("Admin", "/PatientTestInformation/Make", "global");

AccessObject.addRequestRoute("/PatientTestInformation/Find");
AccessObject.addAction("Patient", "/PatientTestInformation/Find", "self");
AccessObject.addAction("Staff", "/PatientTestInformation/Find", "global");
AccessObject.addAction("Admin", "/PatientTestInformation/Find", "global");

AccessObject.addRequestRoute("/PatientTestInformation/Modify");
AccessObject.addAction("Staff", "/PatientTestInformation/Modify", "global");
AccessObject.addAction("Admin", "/PatientTestInformation/Modify", "global");

AccessObject.addRequestRoute("/PatientTestInformation/Delete");
AccessObject.addAction("Staff", "/PatientTestInformation/Delete", "global");
AccessObject.addAction("Admin", "/PatientTestInformation/Delete", "global");


/* -------------------------------- Start up -------------------------------- */

let dbInterface = new Requests({
    MongoosePath: "NHS"
});

dbInterface.configure("Account", Accounts);
dbInterface.configure("Token", Tokens);
dbInterface.configure("StaffProfile", StaffProfiles);
dbInterface.configure("PatientProfile", PatientProfiles);
dbInterface.configure("PatientTestRecord", patientTests);
dbInterface.configure("PatientTestInformation", testInformation);


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

server.route("/Account/Delete").post(async function(req, res) {

    let accountType = "public";
    let accountInformation : any = {};              // To keep variable declarations happy

    
    let tokenPack = unpack(req);

    if (tokenPack.hasOwnProperty("Access Token")) {
        let tokenInformation = await crossRefTok(tokenPack);
        accountInformation = await accountRef(tokenInformation);

        accountType = accountInformation.type;
    }
    


    let isSelf = AccessObject.checkPermission(accountType, req.path, "self");
    let isGlobal = AccessObject.checkPermission(accountType, req.path, "global");

    if (isGlobal) {
        dbInterface.Query("Delete Account", {username: req.body.bundle.username});
        dbInterface.Query("Delete Token", {username: req.body.bundle.username});

        res.json({
            message: "Success"
        });
    } else if (isSelf) {
        dbInterface.Query("Delete Account", {username: accountInformation.username});
        dbInterface.Query("Delete Token", {username: accountInformation.username});

        res.json({
            message: "Success"
        });
    } else {
        res.json({
            message: "Path not allowed"
        });
    }
});




/* ------------------------ Generic Route Definitions ----------------------- */

let verbs = ["Make", "Find", "Modify", "Delete"];
let paths = ["StaffProfile", "PatientProfile", "PatientTestRecord", "PatientTestInformation"]

paths.forEach(path => {
    verbs.forEach(verb => {
        let route = server.route("/" + path + "/" + verb);

        let info = extract(route);
        let method = prep(info, dbInterface);

        route.post(method);
    })
})


/* --------------------------------- Listen --------------------------------- */

server.listen(SERVER_PORT, () => {
    mainLogger.log(SERVER_MSG);
})
