import Mongoose from "mongoose";


let account_s : Mongoose.Schema = new Mongoose.Schema({
    username: String,
    password: String,
    type: String
});

let Accounts : Mongoose.Model<any> = new (Mongoose.model as any)("Accounts", account_s, "Accounts");



let token_s : Mongoose.Schema = new Mongoose.Schema({
    username: String,
    token: String,
    browserID: String
});

let Tokens : Mongoose.Model<any> = new (Mongoose.model as any)("Tokens", token_s, "Tokens");


let staff_profile_s : Mongoose.Schema = new Mongoose.Schema({
    username: String,
    title: String,
    forename: String,
    surname: String,
    hospital: String
});

let StaffProfiles : Mongoose.Model<any> = new (Mongoose.model as any)("StaffProfiles", staff_profile_s, "StaffProfiles");

let patient_profile_s : Mongoose.Schema = new Mongoose.Schema({
    username: String,
    title: String,
    forename: String,
    surname: String,
    hospital: String,
    DOB: String,
    NHSNumber: String,
    Address: String
});

let PatientProfiles : Mongoose.Model<any> = new (Mongoose.model as any)("PatientProfiles", patient_profile_s, "PatientProfiles");


let patientTests_s : Mongoose.Schema = new Mongoose.Schema({
    NHSNumber: String,
    TestID: String
});

let patientTests : Mongoose.Model<any> = new (Mongoose.model as any)("PatientTests", patientTests_s, "PatientTests");

let testInformation_s : Mongoose.Schema = new Mongoose.Schema({
    TestID: String,
    Malign: Number,
    Benign: Number,
    ImagePath: String
});

let testInformation : Mongoose.Model<any> = new (Mongoose.model as any)("testInformation", testInformation_s, "testInformation");

export {Accounts, Tokens, StaffProfiles, PatientProfiles, patientTests, testInformation};