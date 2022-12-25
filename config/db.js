const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.

function mongoConnect() {
  mongoose.connect(`${process.env.MONGO_URI}`, (err) => {
    // mongoose.connect(`mongodb://127.0.0.1:27017/purchaseOrder`, (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  });
}

module.exports = mongoConnect;