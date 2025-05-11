const express = require('express');
const router = express.Router();
const {
  upsertProfile,
  getProfile,
  addTransaction,
  getTransactions
} = require('../controllers/userController');

router.post('/profile', upsertProfile);
router.get('/profile/:wallet', getProfile);
router.post('/transaction', addTransaction);
router.get('/transactions/:wallet', getTransactions);

module.exports = router;
