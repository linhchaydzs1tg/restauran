const mongoose = require("mongoose");

function connect() {
  try {
    mongoose.connect("mongodb://localhost:27017");
    console.log("Connect successfully!!!");
  } catch (error) {
    console.error("Connect failure!!!");
  }
}
module.exports = { connect };
