/* -------------------------------------------------------------------------- */
/*                               CheckAccount.ts                              */
/* -------------------------------------------------------------------------- */

/* ----------------------------- Mongoose Setup ----------------------------- */

import {Accounts as AccountModel} from "../../Schemas/Schemas";


/* ------------------------ Account Referencing Setup ----------------------- */

// Here we're checking our account information using what information we grabbed
// using CrossRef.ts

export default async function SearchAccount(username: string, password: string) {

    let search = {
        username: username,
        password: password
    }

    let accountInformation = await AccountModel.findOne(search);

    if (!accountInformation) {
        return true;
    }

    return accountInformation;
}