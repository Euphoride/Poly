"use strict";
/* -------------------------------------------------------------------------- */
/*                                 console.ts                                 */
/* -------------------------------------------------------------------------- */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* --------------------------------- Imports -------------------------------- */
var express_1 = __importDefault(require("express"));
var Logger_1 = __importDefault(require("./Logging/Logger"));
var Requests_1 = __importDefault(require("./Routes/Requests"));
var MakeAccount_1 = __importDefault(require("./Authentication/Account/MakeAccount"));
var CheckAccount_1 = __importDefault(require("./Authentication/Account/CheckAccount"));
var PushToken_1 = __importDefault(require("./Authentication/Token/PushToken"));
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
var dbInterface = new Requests_1.default({
    MongoosePath: "NHS"
});
server.route("/Account/Make").post(function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var username, password, type, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = req.body.bundle.username;
                    password = req.body.bundle.password;
                    type = req.body.bundle.type;
                    return [4 /*yield*/, MakeAccount_1.default(username, password, type)];
                case 1:
                    response = _a.sent();
                    response = response || "Account successfully made!";
                    res.json({
                        message: response
                    });
                    return [2 /*return*/];
            }
        });
    });
});
server.route("/Token/Push").post(function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var username, password, browserID, accountExists, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = req.body.bundle.username;
                    password = req.body.bundle.password;
                    browserID = req.body.bundle.browserID;
                    return [4 /*yield*/, CheckAccount_1.default(username, password)];
                case 1:
                    accountExists = _a.sent();
                    if (!accountExists) return [3 /*break*/, 3];
                    return [4 /*yield*/, PushToken_1.default(browserID, username)];
                case 2:
                    token = _a.sent();
                    res.json({
                        token: token
                    });
                    return [3 /*break*/, 4];
                case 3:
                    res.json({
                        message: "Account doesn't exist"
                    });
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
});
// Listen
server.listen(SERVER_PORT, function () {
    mainLogger.log(SERVER_MSG);
});
