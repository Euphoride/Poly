/* -------------------------------------------------------------------------- */
/*                                 SendPack.ts                                */
/* -------------------------------------------------------------------------- */

const DEBUG : boolean = true;

const JSON_TOKEN_NAMES : Array<string> = [];
const COOKIE_TOKEN_NAMES : Array<string> = ["Access Token"];


export default function pack(tokens : any) {
    // So here we're just packing up our tokens into a, well, package

    // Either this is packed into a cookie package and a json package respectively, 
    // or in debug, it's all json

    let jsonPack : any   = {};
    let cookiePack : any = {};

    JSON_TOKEN_NAMES.forEach(name => {
        if (tokens.hasOwnProperty(name)) {
            jsonPack[name] = tokens[name];
        }
    });

    if (DEBUG) {
        COOKIE_TOKEN_NAMES.forEach(name => {
            if (tokens.hasOwnProperty(name)) {
                jsonPack[name] = tokens[name];
            }
        });
    } else {
        COOKIE_TOKEN_NAMES.forEach(name => {
            if (tokens.hasOwnProperty(name)) {
                cookiePack[name] = tokens[name];
            }
        });
    }

    return [jsonPack, cookiePack];
}