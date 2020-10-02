"use strict";
/* -------------------------------------------------------------------------- */
/*                                 Requests.ts                                */
/* -------------------------------------------------------------------------- */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
// Class definition
var Requests = /** @class */ (function () {
    // Constructor
    function Requests(configuration) {
        // Configure mongoose and the mongodb database
        this.MongoosePath = "mongodb://localhost:27017/" + configuration.MongoosePath;
        this.MongooseConfig = configuration.MongooseConfig || {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        };
        // Connect to MongoDB
        mongoose_1.default.connect(this.MongoosePath, this.MongooseConfig);
        // Hold the connection for future use
        this.MongooseConnection = mongoose_1.default.connection;
        // Predefined tracks
        this.Tracks = {
            Make: this.Make,
            Find: this.Find,
            Modify: this.Modify,
            Delete: this.Delete,
            Search: this.Search
        };
        // Registered MongoDB collections
        this.Collections = {};
    }
    Requests.prototype.Query = function (query, queryInformation) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, queryTrack, collectionName, trackFunction, collection;
            return __generator(this, function (_b) {
                console.log("[Query]: Entered [Query]. Deconstructing presented information...");
                _a = query.split(" "), queryTrack = _a[0], collectionName = _a[1];
                if (!this.Collections.hasOwnProperty(collectionName)) {
                    console.log("[Query]: Collection wasn't found");
                    console.log("[Query]: " + collectionName);
                    return [2 /*return*/, false];
                }
                trackFunction = this.Tracks[queryTrack];
                collection = this.Collections[collectionName];
                return [2 /*return*/, trackFunction.call(this, collection, queryInformation)];
            });
        });
    };
    Requests.prototype.Make = function (collection, queryInformation) {
        return __awaiter(this, void 0, void 0, function () {
            var item, newItem, saved, name_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(queryInformation);
                        console.log("[Make]: Entered [Make]. Verifying item doesn't exist...");
                        return [4 /*yield*/, collection.findOne(queryInformation)];
                    case 1:
                        item = _a.sent();
                        if (!!item) return [3 /*break*/, 3];
                        console.log("[Make]: Attempting to save item");
                        newItem = new collection(queryInformation);
                        return [4 /*yield*/, newItem.save()];
                    case 2:
                        saved = _a.sent();
                        console.log("[Make]: Saved");
                        return [2 /*return*/, queryInformation];
                    case 3:
                        console.log("[Make]: Item exists in collection. Passing to modify");
                        name_1 = Object.keys(queryInformation)[0];
                        _a.label = 4;
                    case 4: return [2 /*return*/, false];
                }
            });
        });
    };
    Requests.prototype.Find = function (collection, queryInformation) {
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("[Find]: Entered [Find]. Searching for item with no filter parameters...");
                        return [4 /*yield*/, collection.find(queryInformation)];
                    case 1:
                        item = _a.sent();
                        console.log("[Find]: Finished find. Note: This does not mean [Find] found anything.");
                        return [2 /*return*/, item];
                }
            });
        });
    };
    Requests.prototype.Modify = function (collection, queryInformation) {
        return __awaiter(this, void 0, void 0, function () {
            var search, apply, item;
            return __generator(this, function (_a) {
                console.log("[Modify]: Entered [Modify]. Deconstructing Search/Apply pair");
                search = queryInformation[0], apply = queryInformation[1];
                console.log("[Modify]: Beginning update. Note: using findOneAndUpdate");
                item = collection.findOneAndUpdate(search, apply);
                console.log("[Modify]: Updated");
                return [2 /*return*/, item];
            });
        });
    };
    Requests.prototype.Delete = function (collection, queryInformation) {
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("[Delete]: Entered [Delete]. Deleting item... Note: Using findOneAndDelete");
                        return [4 /*yield*/, collection.findOneAndDelete(queryInformation)];
                    case 1:
                        item = _a.sent();
                        console.log("[Delete]: Deleted");
                        return [2 /*return*/, item];
                }
            });
        });
    };
    Requests.prototype.Search = function (collection, queryInformation) {
        return __awaiter(this, void 0, void 0, function () {
            var searchQuery, searchItem, items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("[Search]: Entered [Search]. Beginning search query construction");
                        searchQuery = {};
                        for (searchItem in queryInformation) {
                            searchQuery[searchItem]["$gt"] = queryInformation[searchItem].lower;
                            searchQuery[searchItem]["$lt"] = queryInformation[searchItem].higher;
                        }
                        console.log("[Search]: Completed restructure. Beginning filtered find.");
                        return [4 /*yield*/, collection.find(searchQuery)];
                    case 1:
                        items = _a.sent();
                        console.log("[Search]: Completed");
                        return [2 /*return*/, items];
                }
            });
        });
    };
    Requests.prototype.configure = function (name, mongooseCollection) {
        this.Collections[name] = mongooseCollection;
    };
    return Requests;
}());
exports.default = Requests;
