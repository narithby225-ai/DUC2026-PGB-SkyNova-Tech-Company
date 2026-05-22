const express = require('express');
const router = express.Router();
const { Branch, User, Transaction } = require('../models');

// Get all branches
router.get('/branches', async (req, res) => {
  try {
    const branches = await Branch.findAll ? await Branch.findAll() : await Branch.find();
    res.json({
      success: true,
      count: branches.length,
      data: branches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get branch by ID
router.get('/branches/:id', async (req, res) => {
  try {
    const branch = await Branch.findById 
      ? await Branch.findById(req.params.id)
      : await Branch.findById(req.params.id);
    
    if (!branch) {
      return res.status(404).json({
        success: false,
        error: 'Branch not found'
      });
    }
    
    res.json({
      success: true,
      data: branch
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get all transactions
router.get('/transactions', async (req, res) => {
  try {
    const { branchId, startDate, endDate, paymentMethod } = req.query;
    
    let query = {};
    if (branchId) query.branchId = branchId;
    if (paymentMethod) query.paymentMethod = paymentMethod;
    
    const transactions = await Transaction.findAll 
      ? await Transaction.findAll({ where: query, includeBranch: true })
      : await Transaction.find(query).populate('branchId userId');
    
    res.json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Create transaction
router.post('/transactions', async (req, res) => {
  try {
    const { branchId, userId, amount, description, paymentMethod, currency } = req.body;
    
    // Validation
    if (!branchId || !amount || !description) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: branchId, amount, description'
      });
    }
    
    const transaction = await Transaction.create({
      branchId,
      userId: userId || null,
      amount: parseFloat(amount),
      description,
      paymentMethod: paymentMethod || 'CASH',
      currency: currency || 'KHR',
      verificationStatus: 'pending'
    });
    
    res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get daily summary
router.get('/reports/daily', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const transactions = await Transaction.findAll
      ? await Transaction.findAll({ 
          where: { createdAt: { $gte: today } },
          includeBranch: true 
        })
      : await Transaction.find({ 
          createdAt: { $gte: today } 
        }).populate('branchId');
    
    // Calculate totals
    const total = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
    
    // Group by branch
    const byBranch = {};
    transactions.forEach(t => {
      const branchName = t.Branch?.name || t.branchId?.name || 'Unknown';
      if (!byBranch[branchName]) {
        byBranch[branchName] = { count: 0, total: 0 };
      }
      byBranch[branchName].count++;
      byBranch[branchName].total += t.amount || 0;
    });
    
    res.json({
      success: true,
      data: {
        date: today.toISOString().split('T')[0],
        totalAmount: total,
        totalTransactions: transactions.length,
        byBranch
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get statistics
router.get('/stats', async (req, res) => {
  try {
    const branches = await Branch.findAll ? await Branch.findAll() : await Branch.find();
    const transactions = await Transaction.findAll ? await Transaction.findAll({}) : await Transaction.find();
    const users = await User.findAll ? await User.findAll() : await User.find();
    
    const totalAmount = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
    
    res.json({
      success: true,
      data: {
        totalBranches: branches.length,
        totalUsers: users.length,
        totalTransactions: transactions.length,
        totalAmount,
        averageTransaction: transactions.length > 0 ? totalAmount / transactions.length : 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
