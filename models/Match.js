const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const MatchSchema = new Schema({
  user_id: String,
  user_name: String,
  product_id: String,
  product_user_id: String,
  product_user_name: String,
  match:{type:Boolean, default:false}
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = mongoose.model('Match', MatchSchema);
