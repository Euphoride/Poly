/* -------------------------------------------------------------------------- */
/*                                  Unpack.ts                                 */
/* -------------------------------------------------------------------------- */

const DEBUG : boolean = true;

const TOKEN_NAMES : Array<string> = ["Access Token"];

export default function unpack(request: any) {
    // Unpacking a request from a client for authentication
    // related things.

    // First thing is any tokens - two ways to grab that, via 
    // cookies or via the body.

    // We'll have preset names for these tokens, and they need to be in 
    // the cookies header or in the "top layer" of the JSON body.

    // I think for a debug mode we'll fetch everything out of the JSON body.


    // ------------------------------------------------


    // Now we'll unpack both the body and the cookies

    let reqBody   : any = request.body;
    let reqCookie : any = request.cookies;

    // Result Pack

    let resultPack : any = {};

    // Search

    TOKEN_NAMES.forEach(tokenName => {
        if (reqBody.hasOwnProperty(tokenName)) {
            resultPack[tokenName] = reqBody[tokenName];
        }
    });

    // If not Debug, search cookies too

    if (!DEBUG) {
        TOKEN_NAMES.forEach(tokenName => {
            if (reqCookie.hasOwnProperty(tokenName)) {
                resultPack[tokenName] = reqBody[tokenName];
            }
        })
    }

    return resultPack;
}