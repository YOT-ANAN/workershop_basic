const mongoose = require("mongoose");
const users = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstname: { type: String },
  lastname: { type: String },
  gender: { type: String },
  age: { type: Number },
});

module.exports = mongoose.model("users", users);
