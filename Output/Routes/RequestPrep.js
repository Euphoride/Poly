"use strict";
/* -------------------------------------------------------------------------- */
/*                               RequestPrep.ts                               */
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
var Access_1 = __importDefault(require("../Authentication/Access Control/Access"));
var AccountRef_1 = __importDefault(require("../Authentication/Account/AccountRef"));
var CrossRef_1 = __importDefault(require("../Authentication/Token/CrossRef"));
var Unpack_1 = __importDefault(require("../Authentication/Border/Unpack"));
// Uses: Subject, Method
var dualMethods = ["Modify"];
var sDefinedMethods = ["Delete"];
function prepRequest(informationPack, reqObj, quiet) {
    if (quiet === void 0) { quiet = false; }
    var Query = informationPack.Method + " " + informationPack.Subject;
    var AccessObj = new Access_1.default();
    AccessObj.load("./Authentication/Access Control/Table.json");
    var requestMethod = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var pack, tokenPack, accountInformation, QueryFeed, selfAlterPermitted, globalAlterPermitted, response, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pack = Unpack_1.default(req);
                        return [4 /*yield*/, CrossRef_1.default(pack)];
                    case 1:
                        tokenPack = _a.sent();
                        return [4 /*yield*/, AccountRef_1.default(tokenPack)];
                    case 2:
                        accountInformation = _a.sent();
                        QueryFeed = req.body.bundle;
                        selfAlterPermitted = AccessObj.checkPermission(accountInformation.type, informationPack.route, "self");
                        globalAlterPermitted = AccessObj.checkPermission(accountInformation.type, informationPack.route, "global");
                        if (!globalAlterPermitted) return [3 /*break*/, 4];
                        return [4 /*yield*/, reqObj.Query(Query, QueryFeed)];
                    case 3:
                        response = _a.sent();
                        res.json({
                            message: response
                        });
                        return [3 /*break*/, 7];
                    case 4:
                        if (!selfAlterPermitted) return [3 /*break*/, 6];
                        // Branchless programming amirite 
                        if (typeof QueryFeed != "object" || QueryFeed == null) {
                            res.json({
                                message: "Bad Request"
                            });
                            return [2 /*return*/];
                        }
                        if (QueryFeed.username != accountInformation.username) {
                            res.json({
                                message: "Bad Request"
                            });
                            return [2 /*return*/];
                        }
                        if (dualMethods.includes(informationPack.Method)) {
                            QueryFeed = [{ username: accountInformation.username }, QueryFeed];
                        }
                        else if (sDefinedMethods.includes(informationPack.Method)) {
                            QueryFeed = { username: accountInformation.username };
                        }
                        return [4 /*yield*/, reqObj.Query(Query, QueryFeed)];
                    case 5:
                        response = _a.sent();
                        if (!quiet) {
                            res.json({
                                message: true
                            });
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        res.json({
                            message: "Route not permitted!"
                        });
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return requestMethod;
}
exports.default = prepRequest;
