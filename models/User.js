const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  wallet_address: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: String,
  description: String,
  website: String,
  facebook: String,
  twitter: String,
  instagram: String,
  image_url: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
