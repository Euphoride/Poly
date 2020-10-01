import Mongoose, {Document} from "mongoose";

interface iAccount_s extends Document {
    username: string;
    password: string;
    type: string;
}

let account_s : Mongoose.Schema = new Mongoose.Schema({
    username: String,
    password: String,
    type: String
});

let Accounts : Mongoose.Model<iAccount_s> = new (Mongoose.model as any)("Accounts", account_s, "Accounts");


interface iToken_s extends Document {
    username: string;
    password: string;
    browserID: string;
}

let token_s : Mongoose.Schema = new Mongoose.Schema({
    username: String,
    token: String,
    browserID: String
});

let Tokens : Mongoose.Model<iToken_s> = new (Mongoose.model as any)("Tokens", token_s, "Tokens");

export {Accounts, Tokens};