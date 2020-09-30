"use strict";
/* -------------------------------------------------------------------------- */
/*                                  Unpack.ts                                 */
/* -------------------------------------------------------------------------- */
Object.defineProperty(exports, "__esModule", { value: true });
var DEBUG = true;
var TOKEN_NAMES = ["Access Token"];
function unpack(request) {
    // Unpacking a request from a client for authentication
    // related things.
    // First thing is any tokens - two ways to grab that, via 
    // cookies or via the body.
    // We'll have preset names for these tokens, and they need to be in 
    // the cookies header or in the "top layer" of the JSON body.
    // I think for a debug mode we'll fetch everything out of the JSON body.
    // ------------------------------------------------
    // Now we'll unpack both the body and the cookies
    var reqBody = request.body;
    var reqCookie = request.cookies;
    // Result Pack
    var resultPack = {};
    // Search
    TOKEN_NAMES.forEach(function (tokenName) {
        if (reqBody.hasOwnProperty(tokenName)) {
            resultPack[tokenName] = reqBody[tokenName];
        }
    });
    // If not Debug, search cookies too
    if (!DEBUG) {
        TOKEN_NAMES.forEach(function (tokenName) {
            if (reqCookie.hasOwnProperty(tokenName)) {
                resultPack[tokenName] = reqBody[tokenName];
            }
        });
    }
    return resultPack;
}
exports.default = unpack;
