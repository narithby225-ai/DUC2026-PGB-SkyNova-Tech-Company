const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    default: 'Phnom Penh'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  contactNumber: String,
  address: String
}, {
  timestamps: true
});

// Index for faster queries
branchSchema.index({ name: 1 });
branchSchema.index({ isActive: 1 });

module.exports = mongoose.model('Branch', branchSchema);
