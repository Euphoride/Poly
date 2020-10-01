/* -------------------------------------------------------------------------- */
/*                                  Access.ts                                 */
/* -------------------------------------------------------------------------- */

import fs from "fs";

export default class Access {
    loadedAccessTable : any;
    currentFileName: string;

    constructor() {
        this.loadedAccessTable = {};
        this.currentFileName = "";
    }

    load(filename: string) {
        this.currentFileName = filename;

        let data: Buffer = fs.readFileSync(filename);

        let jsonData: any = JSON.parse(data.toString());

        this.loadedAccessTable = jsonData;
    }

    write(filedata: string) {
        fs.writeFileSync(this.currentFileName, filedata);
    }

    readPermissions(accountType: string, requestRoute: string) : Array<string> {
        let permissions: Array<string> = this.loadedAccessTable[requestRoute][accountType];

        return permissions;
    }

    checkPermission(accountType : string, requestRoute: string, action : string) : boolean {
        let permissions = this.readPermissions(accountType, requestRoute);

        let pIncludes = false;

        if (permissions != undefined) {
            pIncludes = permissions.includes(action)
        }

        return pIncludes || this.checkPermission("*", requestRoute, action);
    }

    addAction(accountType: string, requestRoute: string, action: string) {
        if (this.loadedAccessTable[requestRoute][accountType] == undefined) {
            this.loadedAccessTable[requestRoute][accountType] = [];
        } 

        if (!this.loadedAccessTable[requestRoute][accountType].includes(action)) {
            this.loadedAccessTable[requestRoute][accountType].push(action);
        }

        this.write(JSON.stringify(this.loadedAccessTable));
    }

    addRequestRoute(requestRoute: string) {
        if (this.loadedAccessTable[requestRoute] == undefined) {
            this.loadedAccessTable[requestRoute] = {};

            this.write(JSON.stringify(this.loadedAccessTable));
        }
    }

    
}