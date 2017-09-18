const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ProductSchema = new Schema({
  // user_id: String,
  name: String,
  avatar: String,
  description: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = mongoose.model('Product', ProductSchema);
