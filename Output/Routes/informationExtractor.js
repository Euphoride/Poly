"use strict";
/* -------------------------------------------------------------------------- */
/*                           informationExtractor.ts                          */
/* -------------------------------------------------------------------------- */
Object.defineProperty(exports, "__esModule", { value: true });
// Extract information from an Express Router object
var format = ["Subject", "Method"];
function extract(routeObject) {
    var path = routeObject.path;
    var pathComponents = path.split("/");
    if (pathComponents.length != format.length + 1) {
        return "Path was invalid";
    }
    var rObject = {};
    for (var iterator = 1; iterator < pathComponents.length; iterator++) {
        rObject[format[iterator - 1]] = pathComponents[iterator];
    }
    rObject["routeObject"] = routeObject;
    rObject["route"] = path;
    return rObject;
}
exports.default = extract;
