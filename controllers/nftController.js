const NFT = require('../models/NFT');

// Create new NFT
const createNFT = async (req, res) => {
  try {
    const nft = new NFT(req.body);
    await nft.save();
    res.status(201).json(nft);
  } catch (error) {
    console.error('Error in createNFT:', error);
    res.status(500).json({ message: 'Error creating NFT', error: error.message });
  }
};

// Get all NFTs
const getAllNFTs = async (req, res) => {
  try {
    const nfts = await NFT.find();
    res.status(200).json(nfts);
  } catch (error) {
    console.error('Error in getAllNFTs:', error);
    res.status(500).json({ message: 'Error fetching NFTs', error: error.message });
  }
};

// Get NFT by tokenId
const getNFTByTokenId = async (req, res) => {
  try {
    const { tokenId } = req.params;
    const nft = await NFT.findOne({ tokenId });
    
    if (!nft) {
      return res.status(404).json({ message: 'NFT not found' });
    }
    
    res.status(200).json(nft);
  } catch (error) {
    console.error('Error in getNFTByTokenId:', error);
    res.status(500).json({ message: 'Error fetching NFT', error: error.message });
  }
};

// Get NFTs by seller address
const getNFTsBySeller = async (req, res) => {
  try {
    const { seller } = req.params;
    const nfts = await NFT.find({ seller });
    res.status(200).json(nfts);
  } catch (error) {
    console.error('Error in getNFTsBySeller:', error);
    res.status(500).json({ message: 'Error fetching NFTs', error: error.message });
  }
};

// Get NFTs by owner address
const getNFTsByOwner = async (req, res) => {
  try {
    const { owner } = req.params;
    const nfts = await NFT.find({ owner });
    res.status(200).json(nfts);
  } catch (error) {
    console.error('Error in getNFTsByOwner:', error);
    res.status(500).json({ message: 'Error fetching NFTs', error: error.message });
  }
};

// Update NFT
const updateNFT = async (req, res) => {
  try {
    const { tokenId } = req.body;
    console.log("Backend: Received NFT update request for tokenId:", tokenId, "Type:", typeof tokenId);
    console.log("Backend: Full request body for updateNFT:", req.body);
    const nft = await NFT.findOneAndUpdate(
      { tokenId },
      req.body,
      { new: true }
    );
    
    if (!nft) {
      console.log("Backend: NFT with tokenId", tokenId, "not found.");
      return res.status(404).json({ message: 'NFT not found' });
    }
    
    res.status(200).json(nft);
  } catch (error) {
    console.error('Error in updateNFT:', error);
    res.status(500).json({ message: 'Error updating NFT', error: error.message });
  }
};

// Delete NFT
const deleteNFT = async (req, res) => {
  try {
    const { tokenId } = req.params;
    const nft = await NFT.findOneAndDelete({ tokenId });
    
    if (!nft) {
      return res.status(404).json({ message: 'NFT not found' });
    }
    
    res.status(200).json({ message: 'NFT deleted successfully' });
  } catch (error) {
    console.error('Error in deleteNFT:', error);
    res.status(500).json({ message: 'Error deleting NFT', error: error.message });
  }
};

module.exports = {
  createNFT,
  getAllNFTs,
  getNFTByTokenId,
  getNFTsBySeller,
  getNFTsByOwner,
  updateNFT,
  deleteNFT
}; 