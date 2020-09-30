/* -------------------------------------------------------------------------- */
/*                                AccountRef.ts                               */
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

/* ------------------------ Account Referencing Setup ----------------------- */

// Here we're checking our account information using what information we grabbed
// using CrossRef.ts

export default async function AccountReference(informationPack : any) {
    let username : string = informationPack.username;

    let search = {
        username: username
    }

    let accountInformation = await AccountModel.findOne(search);

    return accountInformation;
}