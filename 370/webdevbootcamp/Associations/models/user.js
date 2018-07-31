var mongoose = require("mongoose");
// USER

var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema]
});

module.exports = mongoose.model("User", userSchema);
