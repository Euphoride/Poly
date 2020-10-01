"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tokens = exports.Accounts = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var account_s = new mongoose_1.default.Schema({
    username: String,
    password: String,
    type: String
});
var Accounts = new mongoose_1.default.model("Accounts", account_s, "Accounts");
exports.Accounts = Accounts;
var token_s = new mongoose_1.default.Schema({
    username: String,
    token: String,
    browserID: String
});
var Tokens = new mongoose_1.default.model("Tokens", token_s, "Tokens");
exports.Tokens = Tokens;
