/* -------------------------------------------------------------------------- */
/*                               RequestPrep.ts                               */
/* -------------------------------------------------------------------------- */

import Access from "../Authentication/Access Control/Access";
import Requests from "./Requests";

import refAccount from "../Authentication/Account/AccountRef";
import refToken   from "../Authentication/Token/CrossRef";
import unpack     from "../Authentication/Border/Unpack";

// Uses: Subject, Method

let dualMethods = ["Modify"];
let sDefinedMethods = ["Delete"];

export default function prepRequest(informationPack: any, reqObj: Requests, quiet : boolean = false) {
    let Query : string = informationPack.Method + " " + informationPack.Subject;

    let AccessObj = new Access();
    AccessObj.load("./Authentication/Access Control/Table.json");


    let requestMethod = async function (req : any, res: any) {
        let pack = unpack(req);
        let tokenPack = await refToken(pack);
        let accountInformation : any = await refAccount(tokenPack);


        let QueryFeed = req.body.bundle;

        let selfAlterPermitted = AccessObj.checkPermission(accountInformation.type, informationPack.route, "self");
        let globalAlterPermitted = AccessObj.checkPermission(accountInformation.type, informationPack.route, "global");

        if (globalAlterPermitted) {
            let response : any = await reqObj.Query(Query, QueryFeed);

            res.json({
                message: response
            });

        } else if (selfAlterPermitted) {

            // Branchless programming amirite 

            if (typeof QueryFeed != "object" || QueryFeed == null) {
                res.json({
                    message: "Bad Request"
                });
                return;
            }

            if (QueryFeed.username != accountInformation.username) {
                res.json({
                    message: "Bad Request"
                });
                return;
            }

            if (dualMethods.includes(informationPack.Method)) {
                QueryFeed = [{username: accountInformation.username}, QueryFeed];
            } else if (sDefinedMethods.includes(informationPack.Method)) {
                QueryFeed = {username : accountInformation.username};
            }

            let response : any = await reqObj.Query(Query, QueryFeed);

            if (!quiet) {
                res.json({
                    message: true
                });
            }
        } else {
            res.json({
                message: "Route not permitted!"
            });
        }
    }

    return requestMethod;
}