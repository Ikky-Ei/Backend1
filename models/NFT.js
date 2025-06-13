const mongoose = require('mongoose');

const NFTSchema = new mongoose.Schema({
  tokenId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  tokenURI: {
    type: String,
    required: true
  },
  seller: {
    type: String,
    required: true,
    ref: 'User'  // Reference to User model
  },
  owner: {
    type: String,
    required: true,
    ref: 'User'  // Reference to User model
  },
  category: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  isListed: {
    type: Boolean,
    default: true
  },
  isSold: {
    type: Boolean,
    default: false
  },
  duration: {
    value: { type: Number, required: false },
    unit: { type: String, enum: ["day", "week", "month", "year"], required: false }
  }
});

module.exports = mongoose.model('NFT', NFTSchema); 