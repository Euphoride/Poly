"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testInformation = exports.patientTests = exports.PatientProfiles = exports.StaffProfiles = exports.Tokens = exports.Accounts = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var account_s = new mongoose_1.default.Schema({
    username: String,
    password: String,
    type: String
});
var Accounts = new mongoose_1.default.model("Accounts", account_s, "Accounts");
exports.Accounts = Accounts;
var token_s = new mongoose_1.default.Schema({
    username: String,
    token: String,
    browserID: String
});
var Tokens = new mongoose_1.default.model("Tokens", token_s, "Tokens");
exports.Tokens = Tokens;
var staff_profile_s = new mongoose_1.default.Schema({
    username: String,
    title: String,
    forename: String,
    surname: String,
    hospital: String
});
var StaffProfiles = new mongoose_1.default.model("StaffProfiles", staff_profile_s, "StaffProfiles");
exports.StaffProfiles = StaffProfiles;
var patient_profile_s = new mongoose_1.default.Schema({
    username: String,
    title: String,
    forename: String,
    surname: String,
    hospital: String,
    DOB: String,
    NHSNumber: String,
    Address: String
});
var PatientProfiles = new mongoose_1.default.model("PatientProfiles", patient_profile_s, "PatientProfiles");
exports.PatientProfiles = PatientProfiles;
var patientTests_s = new mongoose_1.default.Schema({
    NHSNumber: String,
    TestID: String
});
var patientTests = new mongoose_1.default.model("PatientTests", patientTests_s, "PatientTests");
exports.patientTests = patientTests;
var testInformation_s = new mongoose_1.default.Schema({
    TestID: String,
    Malign: Number,
    Benign: Number,
    ImagePath: String
});
var testInformation = new mongoose_1.default.model("testInformation", testInformation_s, "testInformation");
exports.testInformation = testInformation;
