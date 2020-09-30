/* -------------------------------------------------------------------------- */
/*                               MakeAccount.ts                               */
/* -------------------------------------------------------------------------- */

// Mongoose Import so we can work with schemas, models and searching
import mongoose, { Schema, model, Model } from "mongoose";

/* ----------------------------- Mongoose Setup ----------------------------- */

const AccountSchema = new Schema({
    username : String,
    password : String,
    type     : String
});


const AccountModel = new (model as any)("Account", AccountSchema, "Accounts");


/* -------------------------- Account Making Setup -------------------------- */

// Here we're making accounts using a given set of username, password and type
// there are also restrictions on allowed types

let ALLOWED_TYPES : Array<string> = ["test"];

async function MakeAccount(username : string, password: string, type : string) {
    // Check if the account exists already

    let search = {
        username: username
    }

    let foundAccount = await AccountModel.findOne(search);

    if (!foundAccount) {
        // Account doesn't exist, so we can make it :)
        // (if the type fits)

        if (!ALLOWED_TYPES.includes(type)) {
            return "Type not allowed";
        }

        let newAccount = {
            username: username,
            password: password,
            type    : type
        }

        let newAccountDocument = new AccountModel(newAccount);

        await newAccountDocument.save();
        return;
    } else {
        // Account exists, so we need to return an error message

        return "Account Exists"
    }
}