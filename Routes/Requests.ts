/* -------------------------------------------------------------------------- */
/*                                 Requests.ts                                */
/* -------------------------------------------------------------------------- */

import Mongoose from 'mongoose';

// Class definition interfaces

export interface iRequestsConfig {
  MongoosePath: string;
  MongooseConfig?: iMongooseConfig;
}

interface iMongooseConfig {
  [index: string]: boolean;
}

interface iTrack {
  [index: string]: Function;
}

interface iCollection {
  [index: string]: Mongoose.Model<any>;
}



// Class method definition interfaces

interface iQueryInformation {
  [index: string]: any;
}

interface iSearchQueryInformation {
  [index: string]: iQueryInformation;
}


// Class definition

export default class Requests {
  // Mongoose configuration props
  MongoosePath: string;
  MongooseConfig: iMongooseConfig;
  MongooseConnection: Mongoose.Connection;

  // Track configuration props
  Tracks: iTrack;

  // Collection configuration props
  Collections: iCollection;

  // Constructor
  constructor(configuration: iRequestsConfig) {
    // Configure mongoose and the mongodb database
    this.MongoosePath = "mongodb://localhost:27017/" + configuration.MongoosePath;

    this.MongooseConfig = configuration.MongooseConfig || {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    };

    // Connect to MongoDB
    Mongoose.connect(this.MongoosePath, this.MongooseConfig);

    // Hold the connection for future use
    this.MongooseConnection = Mongoose.connection;

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

  async Query(query: string, queryInformation: iQueryInformation): Promise<any> {
    console.log("[Query]: Entered [Query]. Deconstructing presented information...");

    let [queryTrack, collectionName] = query.split(" ");


    if (!this.Collections.hasOwnProperty(collectionName)) {
      console.log("[Query]: Collection wasn't found");
      console.log("[Query]: " + collectionName);
      return false;
    }

    let trackFunction: Function = this.Tracks[queryTrack];
    let collection: Mongoose.Model<any> = this.Collections[collectionName];

    return trackFunction.call(this, collection, queryInformation);
  }

  async Make(collection: Mongoose.Model<any>, queryInformation: iQueryInformation): Promise<any> {
    console.log(queryInformation);
    console.log("[Make]: Entered [Make]. Verifying item doesn't exist...");
    let item : any = await collection.findOne(queryInformation);



    if (!item) {
      console.log("[Make]: Attempting to save item");

      let newItem : any = new collection(queryInformation);

      let saved : any = await newItem.save();

      console.log("[Make]: Saved");
      return queryInformation;
    } else {
      console.log("[Make]: Item exists in collection. Passing to modify");

      let name: string = Object.keys(queryInformation)[0]
    }

    return false;
  }

  async Find(collection: Mongoose.Model<any>, queryInformation: iQueryInformation): Promise<any> {
    console.log("[Find]: Entered [Find]. Searching for item with no filter parameters...");

    let item : any = await collection.find(queryInformation);

    console.log("[Find]: Finished find. Note: This does not mean [Find] found anything.");
    return item;
  }

  async Modify(collection: Mongoose.Model<any>, queryInformation: iQueryInformation[]): Promise<any> {
    console.log("[Modify]: Entered [Modify]. Deconstructing Search/Apply pair");

    let [search, apply] = queryInformation;

    console.log("[Modify]: Beginning update. Note: using findOneAndUpdate");

    let item = collection.findOneAndUpdate(search, apply);

    console.log("[Modify]: Updated");
    return item;
  }

  async Delete(collection: Mongoose.Model<any>, queryInformation: iQueryInformation): Promise<any> {
    console.log("[Delete]: Entered [Delete]. Deleting item... Note: Using findOneAndDelete");


    let item = await collection.findOneAndDelete(queryInformation);

    console.log("[Delete]: Deleted");
    return item;
  }

  async Search(collection: Mongoose.Model<any>, queryInformation: iSearchQueryInformation): Promise<any> {
    console.log("[Search]: Entered [Search]. Beginning search query construction");

    let searchQuery : any = {};

    for (const searchItem in queryInformation) {
      searchQuery[searchItem]["$gt"] = queryInformation[searchItem].lower;

      searchQuery[searchItem]["$lt"] = queryInformation[searchItem].higher;
    }

    console.log("[Search]: Completed restructure. Beginning filtered find.");

    let items : any = await collection.find(searchQuery);

    console.log("[Search]: Completed");
    return items;
  }

  configure(name: string, mongooseCollection: Mongoose.Model<any>): void {
    this.Collections[name] = mongooseCollection;
  }
}