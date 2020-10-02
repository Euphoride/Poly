/* -------------------------------------------------------------------------- */
/*                           informationExtractor.ts                          */
/* -------------------------------------------------------------------------- */

import { IRoute } from "express";

// Extract information from an Express Router object

let format = ["Subject", "Method"];

export default function extract(routeObject: IRoute) {
    let path = routeObject.path;

    let pathComponents = path.split("/");

    if (pathComponents.length != format.length + 1) {
        return "Path was invalid";
    }

    let rObject : any = {};

    for (let iterator = 1; iterator < pathComponents.length; iterator++) {
        rObject[format[iterator - 1]] = pathComponents[iterator];
    }


    rObject["routeObject"] = routeObject;
    rObject["route"] = path;

    return rObject;
}