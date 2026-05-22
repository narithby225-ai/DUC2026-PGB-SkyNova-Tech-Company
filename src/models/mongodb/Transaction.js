const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'KHR',
    enum: ['KHR', 'USD']
  },
  description: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    default: 'CASH',
    enum: ['CASH', 'KHQR', 'CARD', 'BANK_TRANSFER']
  },
  verificationStatus: {
    type: String,
    default: 'pending',
    enum: ['pending', 'verified', 'rejected']
  },
  transactionReference: String,
  photoUrl: String,
  notes: String
}, {
  timestamps: true
});

// Indexes for faster queries
transactionSchema.index({ branchId: 1, createdAt: -1 });
transactionSchema.index({ userId: 1, createdAt: -1 });
transactionSchema.index({ paymentMethod: 1 });
transactionSchema.index({ verificationStatus: 1 });
transactionSchema.index({ createdAt: -1 });

// Virtual for formatted amount
transactionSchema.virtual('formattedAmount').get(function() {
  return this.currency === 'KHR' 
    ? `${this.amount.toLocaleString()} KHR`
    : `$${this.amount.toFixed(2)}`;
});

module.exports = mongoose.model('Transaction', transactionSchema);
