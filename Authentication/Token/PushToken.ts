/* -------------------------------------------------------------------------- */
/*                                PushToken.ts                                */
/* -------------------------------------------------------------------------- */

// Mongoose Import so we can work with schemas, models and searching
import mongoose, { Schema, model, Model } from "mongoose";

// Uuid for random secure tokens
import uuid from "uuid";

/* ----------------------------- Mongoose Setup ----------------------------- */

const AccessTokenSchema = new Schema({
    token     : String,
    browserID : String,
    username  : String
});


const AccessTokenModel = new (model as any)("AccessToken", AccessTokenSchema, "AccessTokens");

/* --------------------------- Making Token Setup --------------------------- */

async function MakeToken(browserID : String, username : String) {
    // Generate this round's token
    let token : string = uuid.v4();

    // Check if this username-browserID combo has an entry

    let search = {
        browserID: browserID,
        username: username
    }

    let pEntry = await AccessTokenModel.findOne(search);

    if (!pEntry) {
        // It doesn't have one, so we'll make one

        let newToken = {
            ...search,
            token: token
        }

        let newTokenDocument = new AccessTokenModel(newToken);

        await newTokenDocument.save();

        return token;
    } else {
        // It does have one, so we'll update it

        let newToken = {
            ...search,
            token: token
        }

        await AccessTokenModel.findOneAndUpdate(search, newToken);

        return token;
    }
}