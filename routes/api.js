const express = require('express');
const router = express.Router();
const {
  upsertProfile,
  getProfile,
  addTransaction,
  getTransactions
} = require('../controllers/userController');

const {
  createNFT,
  getAllNFTs,
  getNFTByTokenId,
  getNFTsBySeller,
  getNFTsByOwner,
  updateNFT,
  deleteNFT
} = require('../controllers/nftController');

// User routes
router.post('/profile', upsertProfile);
router.get('/profile/:wallet', getProfile);
router.post('/transaction', addTransaction);
router.get('/transactions/:wallet', getTransactions);

// NFT routes
router.post('/nft', createNFT);
router.get('/nfts', getAllNFTs);
router.get('/nft/:tokenId', getNFTByTokenId);
router.get('/nfts/seller/:seller', getNFTsBySeller);
router.get('/nfts/owner/:owner', getNFTsByOwner);
router.put('/nft/:tokenId', updateNFT);
router.delete('/nft/:tokenId', deleteNFT);

module.exports = router;
