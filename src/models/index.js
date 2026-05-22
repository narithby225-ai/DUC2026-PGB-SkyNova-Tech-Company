/**
 * Database Factory
 * Supports both MongoDB (for production/multi-device) and JSON (for development)
 */

const dbType = process.env.DATABASE_TYPE || 'json';

let Branch, User, Transaction, initDatabase;

if (dbType === 'mongodb') {
  console.log('🔌 Using MongoDB database');
  const mongodb = require('./mongodb');
  Branch = mongodb.Branch;
  User = mongodb.User;
  Transaction = mongodb.Transaction;
  initDatabase = mongodb.initDatabase;
} else {
  console.log('📁 Using JSON file database');
  const simpleDB = require('./simpleDB');
  Branch = simpleDB.Branch;
  User = simpleDB.User;
  Transaction = simpleDB.Transaction;
  initDatabase = simpleDB.initDatabase;
}

module.exports = {
  Branch,
  User,
  Transaction,
  initDatabase
};
