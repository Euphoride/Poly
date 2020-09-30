"use strict";
/* -------------------------------------------------------------------------- */
/*                                 console.ts                                 */
/* -------------------------------------------------------------------------- */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* --------------------------------- Imports -------------------------------- */
var express_1 = __importDefault(require("express"));
var Logger_1 = __importDefault(require("./Logging/Logger"));
/* --------------------------------- Set up --------------------------------- */
// Start Logging Instance
var mainLogger = new Logger_1.default("Main");
// Start Server Instance
var server = express_1.default();
// JSON Parsing
server.use(express_1.default.json());
// Server Information
var SERVER_PORT = 5000;
var SERVER_MSG = "Server online :) Currently listening on port " + SERVER_PORT.toString();
/* ----------------------------- Routing Set Up ----------------------------- */
// A quick route on /
server.post("/", function (req, res) {
    console.log(req.body);
    res.json(req.body);
    res.end();
});
/* -------------------------------- Start up -------------------------------- */
// Listen
server.listen(SERVER_PORT, function () {
    mainLogger.log(SERVER_MSG);
});
