const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://monish:12345678Mm@cluster0.ukcvbsx.mongodb.net/project?retryWrites=true&w=majority"
);
if (mongoose.connect) {
  console.log("database connect sucess");
} else {
  console.log("something went wrong..!");
}

module.exports.mongoose;
