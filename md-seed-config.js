var mongoose = require('mongoose');
var bluebird = require('bluebird');
var dotenv = require('dotenv');

var User = require("./src/server/db/seeders/users.seeder");

let dbName;

mongoose.Promise =  bluebird || global.Promise || Promise;
dotenv.config();

switch (process.env.NODE_ENV) {
    case "test":
        dbName = "mtnvn_test";
        break;
    case "production":
        dbName = "metvn";
        break;
    default:
        dbName = "metvn_dev";
}

module.exports = {

  // Export the mongoose lib
  mongoose: mongoose,

  // Export the mongodb url
  mongoURL: `mongodb://${process.env.DB_HOST || "127.0.0.1"}:${process.env.DB_PORT || 27017}/${dbName}`,

  /*
    Seeders List
    ------
    order is important
  */
  seedersList: {
      User
  }
};

