"use strict";
/* -------------------------------------------------------------------------- */
/*                                 SendPack.ts                                */
/* -------------------------------------------------------------------------- */
Object.defineProperty(exports, "__esModule", { value: true });
var DEBUG = true;
var JSON_TOKEN_NAMES = [];
var COOKIE_TOKEN_NAMES = ["Access Token"];
function pack(tokens) {
    // So here we're just packing up our tokens into a, well, package
    // Either this is packed into a cookie package and a json package respectively, 
    // or in debug, it's all json
    var jsonPack = {};
    var cookiePack = {};
    JSON_TOKEN_NAMES.forEach(function (name) {
        if (tokens.hasOwnProperty(name)) {
            jsonPack[name] = tokens[name];
        }
    });
    if (DEBUG) {
        COOKIE_TOKEN_NAMES.forEach(function (name) {
            if (tokens.hasOwnProperty(name)) {
                jsonPack[name] = tokens[name];
            }
        });
    }
    else {
        COOKIE_TOKEN_NAMES.forEach(function (name) {
            if (tokens.hasOwnProperty(name)) {
                cookiePack[name] = tokens[name];
            }
        });
    }
    return [jsonPack, cookiePack];
}
exports.default = pack;
