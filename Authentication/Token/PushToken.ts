/* -------------------------------------------------------------------------- */
/*                                PushToken.ts                                */
/* -------------------------------------------------------------------------- */

// Uuid for random secure tokens
import {v4 as uuidv4} from "uuid";

/* ----------------------------- Mongoose Setup ----------------------------- */

import {Tokens as AccessTokenModel} from "../../Schemas/Schemas";


/* --------------------------- Making Token Setup --------------------------- */

export default async function MakeToken(browserID : String, username : String) {
    
    // Generate this round's token
    let token : string = uuidv4();

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

        console.log(newToken);

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