const { Sequelize } = require('sequelize');
const path = require('path');

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../sales.db'),
  logging: false
});

// Import models
const Branch = require('./Branch')(sequelize);
const User = require('./User')(sequelize);
const Transaction = require('./Transaction')(sequelize);

// Define relationships
Branch.hasMany(Transaction, { foreignKey: 'branchId' });
Transaction.belongsTo(Branch, { foreignKey: 'branchId' });

User.hasMany(Transaction, { foreignKey: 'userId' });
Transaction.belongsTo(User, { foreignKey: 'userId' });

User.belongsTo(Branch, { as: 'CurrentBranch', foreignKey: 'currentBranchId' });

// Initialize database
async function initDatabase() {
  await sequelize.sync();
  
  // Seed default branches if none exist
  const branchCount = await Branch.count();
  if (branchCount === 0) {
    const branches = process.env.BRANCHES?.split(',') || ['Branch1', 'Branch2', 'Branch3'];
    await Branch.bulkCreate(
      branches.map(name => ({ name: name.trim() }))
    );
    console.log('✅ Default branches created');
  }
}

module.exports = {
  sequelize,
  Branch,
  User,
  Transaction,
  initDatabase
};
