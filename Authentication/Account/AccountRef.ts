/* -------------------------------------------------------------------------- */
/*                                AccountRef.ts                               */
/* -------------------------------------------------------------------------- */


/* ----------------------------- Mongoose Setup ----------------------------- */

import {Accounts as AccountModel} from "../../Schemas/Schemas";


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