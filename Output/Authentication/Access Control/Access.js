"use strict";
/* -------------------------------------------------------------------------- */
/*                                  Access.ts                                 */
/* -------------------------------------------------------------------------- */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var Access = /** @class */ (function () {
    function Access() {
        this.loadedAccessTable = {};
        this.currentFileName = "";
    }
    Access.prototype.load = function (filename) {
        this.currentFileName = filename;
        var data = fs_1.default.readFileSync(filename);
        var jsonData = JSON.parse(data.toString());
        this.loadedAccessTable = jsonData;
    };
    Access.prototype.write = function (filedata) {
        fs_1.default.writeFileSync(this.currentFileName, filedata);
    };
    Access.prototype.readPermissions = function (accountType, requestRoute) {
        var permissions = this.loadedAccessTable[requestRoute][accountType];
        return permissions;
    };
    Access.prototype.checkPermission = function (accountType, requestRoute, action) {
        var permissions = this.readPermissions(accountType, requestRoute);
        var pIncludes = false;
        if (permissions != undefined) {
            pIncludes = permissions.includes(action);
        }
        return pIncludes || this.checkPermission("*", requestRoute, action);
    };
    Access.prototype.addAction = function (accountType, requestRoute, action) {
        if (this.loadedAccessTable[requestRoute][accountType] == undefined) {
            this.loadedAccessTable[requestRoute][accountType] = [];
        }
        if (!this.loadedAccessTable[requestRoute][accountType].includes(action)) {
            this.loadedAccessTable[requestRoute][accountType].push(action);
        }
        this.write(JSON.stringify(this.loadedAccessTable));
    };
    Access.prototype.addRequestRoute = function (requestRoute) {
        if (this.loadedAccessTable[requestRoute] == undefined) {
            this.loadedAccessTable[requestRoute] = {};
            this.write(JSON.stringify(this.loadedAccessTable));
        }
    };
    return Access;
}());
exports.default = Access;
