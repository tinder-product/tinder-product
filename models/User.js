const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  username: String,
  email: String,
  password: String,
  avatar: {type: String, default: "http://via.placeholder.com/350x350"},
  phone: String,
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
