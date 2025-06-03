const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Create or update user profile
const upsertProfile = async (req, res) => {
  console.log('Received profile update request:', req.body);
  
  try {
    const {
      wallet_address,
      username,
      email,
      description,
      website,
      facebook,
      twitter,
      instagram,
      image_url
    } = req.body;

    if (!wallet_address || !username) {
      console.log('Missing required fields:', { wallet_address, username });
      return res.status(400).json({ message: 'Wallet address and username are required' });
    }

    console.log('Attempting to find/update user with wallet:', wallet_address);
    const user = await User.findOneAndUpdate(
      { wallet_address },
      {
        username,
        email,
        description,
        website,
        facebook,
        twitter,
        instagram,
        image_url
      },
      { upsert: true, new: true }
    );

    console.log('Profile update result:', user);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error in upsertProfile:', error);
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

// Get user profile by wallet address
const getProfile = async (req, res) => {
  console.log('Fetching profile for wallet:', req.params.wallet);
  
  try {
    const { wallet } = req.params;
    const user = await User.findOne({ wallet_address: { $regex: new RegExp(wallet, 'i') } });
    
    if (!user) {
      console.log('No profile found for wallet:', wallet);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Found profile:', user);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error in getProfile:', error);
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};

// Add transaction
const addTransaction = async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    console.error('Error in addTransaction:', error);
    res.status(500).json({ message: 'Error adding transaction', error: error.message });
  }
};

// Get transactions for a wallet
const getTransactions = async (req, res) => {
  try {
    const { wallet } = req.params;
    const transactions = await Transaction.find({ wallet_address: wallet });
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error in getTransactions:', error);
    res.status(500).json({ message: 'Error fetching transactions', error: error.message });
  }
};

module.exports = {
  upsertProfile,
  getProfile,
  addTransaction,
  getTransactions
};
