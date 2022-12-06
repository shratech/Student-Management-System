const mongoose = require("mongoose");

const userall = mongoose.model("usersdata", {
  firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  location: { type: String, require: true },
  email: { type: String, require: true },
  date: { type: Number, require: true },
  month: { type: Number, require: true },
  year: { type: Number, require: true },
  education: { type: String, require: true },
});

module.exports = { userall };
