const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const MatchSchema = new Schema({
  user_id: String,
  product_id: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = mongoose.model('Match', MatchSchema);
