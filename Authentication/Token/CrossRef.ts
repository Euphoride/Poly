/* -------------------------------------------------------------------------- */
/*                                 CrossRef.ts                                */
/* -------------------------------------------------------------------------- */

// Mongoose Import so we can work with schemas, models and searching
import mongoose, { Schema, model, Model } from "mongoose";

/* ----------------------------- Mongoose Setup ----------------------------- */

const AccessTokenSchema = new Schema({
    token     : String,
    browserID : String,
    username  : String
});


const AccessTokenModel = new (model as any)("AccessToken", AccessTokenSchema, "AccessTokens");


/* ------------------------- Cross Refenencing Setup ------------------------ */

const DEBUG : boolean = true;

const TOKEN_REF : any = {
    "Access Token" : AccessTokenModel
}

const CR_INFO : Array<string> = ["browserID", "username"];

export default async function CrossReference(tokenPack : any) {
    // Essentially here we're going to check against some specified collections
    // to see if the said tokens exist and what information they give to do with
    // the user.

    let found  : number = 0
    const toFind : number = CR_INFO.length;

    const returnPack : any = {};

    // Look over all the token_ref names
    for (const tokenName in TOKEN_REF) {
        // Check if we unpacked this token
        if (tokenPack.hasOwnProperty(tokenName)) {
            // if we did, run a search to get all the information related to it
            let collection : Model<any> = TOKEN_REF[tokenName]

            let search = {
                token : tokenPack[tokenName]
            }

            let tokenInformation = await collection.findOne(search);

            // loop over the search to see if it's part of the cross reference information
            // and if so, add it to the return pack
            for (const tokenInformationKey in tokenInformation) {
                if (CR_INFO.includes(tokenInformationKey)) {
                    returnPack[tokenInformationKey] = tokenInformation[tokenInformationKey];

                    found++;

                    if (found == toFind) {
                        return returnPack;
                    }
                }
            }
        }
    }
}