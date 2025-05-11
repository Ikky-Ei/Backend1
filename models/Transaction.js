const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  wallet_address: { type: String, required: true },
  tx_hash: String,
  tx_type: String,
  timestamp: { type: Date, default: Date.now },
  metadata: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('Transaction', transactionSchema);
