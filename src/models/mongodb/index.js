const mongoose = require('mongoose');
const Branch = require('./Branch');
const User = require('./User');
const Transaction = require('./Transaction');

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    console.log('✅ Using existing MongoDB connection');
    return;
  }

  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bakong-bot';
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log('✅ MongoDB connected successfully');
    console.log(`📍 Database: ${mongoose.connection.name}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
      isConnected = false;
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
      isConnected = true;
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    throw error;
  }
}

async function initDatabase() {
  await connectDB();
  
  // Create default branches if none exist
  const branchCount = await Branch.countDocuments();
  if (branchCount === 0) {
    const branches = process.env.BRANCHES?.split(',') || ['Central Market', 'Russian Market', 'Olympic Market'];
    await Branch.insertMany(
      branches.map(name => ({ 
        name: name.trim(), 
        location: 'Phnom Penh',
        isActive: true 
      }))
    );
    console.log('✅ Default branches created');
  }
}

async function disconnectDB() {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
    console.log('👋 MongoDB disconnected');
  }
}

module.exports = {
  Branch,
  User,
  Transaction,
  connectDB,
  initDatabase,
  disconnectDB
};
