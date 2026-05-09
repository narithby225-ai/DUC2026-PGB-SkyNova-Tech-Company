const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'KHR'
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    photoFileId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    verificationStatus: {
      type: DataTypes.ENUM('pending', 'verified', 'failed'),
      defaultValue: 'pending'
    },
    bakongReference: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  
  return Transaction;
};
