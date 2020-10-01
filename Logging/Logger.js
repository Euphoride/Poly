"use strict";
/* -------------------------------------------------------------------------- */
/*                                  Logger.ts                                 */
/* -------------------------------------------------------------------------- */
Object.defineProperty(exports, "__esModule", { value: true });
// The Classic Logger contraption
var Logger = /** @class */ (function () {
    function Logger(caller) {
        this.caller = caller;
    }
    Logger.prototype.log = function (message) {
        console.log("[" + this.caller + "]: " + message);
    };
    return Logger;
}());
exports.default = Logger;
