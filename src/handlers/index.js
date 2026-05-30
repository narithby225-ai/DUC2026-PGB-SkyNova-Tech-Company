const startHandler = require('./startHandler');
const paymentHandler = require('./paymentHandler');
const reportHandler = require('./reportHandler');
const branchHandler = require('./branchHandler');
const adminHandler = require('./adminHandler');
const analyticsHandler = require('./analyticsHandler');
const { handleRegistration } = require('./registrationHandler');

function registerHandlers(bot) {
  // Track processed messages to prevent duplicates
  const processedMessages = new Set();
  
  // Helper function to check if message was already processed
  const isProcessed = (msgId) => {
    if (processedMessages.has(msgId)) {
      return true;
    }
    processedMessages.add(msgId);
    // Clean up old message IDs after 5 seconds
    setTimeout(() => processedMessages.delete(msgId), 5000);
    return false;
  };
  
  // Command handlers
  bot.onText(/\/start/, (msg) => {
    if (!isProcessed(msg.message_id)) startHandler(bot, msg);
  });
  
  bot.onText(/\/help/, (msg) => {
    if (!isProcessed(msg.message_id)) startHandler(bot, msg);
  });
  
  bot.onText(/\/record/, (msg) => {
    if (!isProcessed(msg.message_id)) paymentHandler.recordPayment(bot, msg);
  });
  
  bot.onText(/\/report/, (msg) => {
    if (!isProcessed(msg.message_id)) reportHandler.generateReport(bot, msg);
  });
  
  bot.onText(/\/daily/, (msg) => {
    if (!isProcessed(msg.message_id)) reportHandler.dailyReport(bot, msg);
  });
  
  bot.onText(/\/weekly/, (msg) => {
    if (!isProcessed(msg.message_id)) analyticsHandler.weeklyAnalytics(bot, msg);
  });
  
  bot.onText(/\/monthly/, (msg) => {
    if (!isProcessed(msg.message_id)) analyticsHandler.monthlyAnalytics(bot, msg);
  });
  
  bot.onText(/\/branch/, (msg) => {
    if (!isProcessed(msg.message_id)) branchHandler.selectBranch(bot, msg);
  });
  
  bot.onText(/\/admin/, (msg) => {
    if (!isProcessed(msg.message_id)) adminHandler.adminPanel(bot, msg);
  });
  
  // Text button handlers
  bot.onText(/📸 Record Payment/, (msg) => {
    if (!isProcessed(msg.message_id)) paymentHandler.recordPayment(bot, msg);
  });
  
  bot.onText(/📊 View Reports/, (msg) => {
    if (!isProcessed(msg.message_id)) reportHandler.generateReport(bot, msg);
  });
  
  bot.onText(/🏪 Select Branch/, (msg) => {
    if (!isProcessed(msg.message_id)) branchHandler.selectBranch(bot, msg);
  });
  
  bot.onText(/📅 Daily Summary/, (msg) => {
    if (!isProcessed(msg.message_id)) reportHandler.dailyReport(bot, msg);
  });
  
  bot.onText(/❓ Help/, (msg) => {
    if (!isProcessed(msg.message_id)) startHandler(bot, msg);
  });
  
  // Callback query handler for inline buttons
  bot.on('callback_query', async (query) => {
    const data = query.data;
    
    if (data.startsWith('branch_')) {
      await branchHandler.handleBranchSelection(bot, query);
    } else if (data.startsWith('method_')) {
      await paymentHandler.handlePaymentMethod(bot, query);
    } else if (data.startsWith('confirm_')) {
      await paymentHandler.confirmPayment(bot, query);
    } else if (data.startsWith('report_')) {
      await reportHandler.handleReportType(bot, query);
    } else if (data.startsWith('admin_')) {
      await adminHandler.handleAdminCallback(bot, query);
    }
  });
  
  // Handle photo uploads (KHQR screenshots)
  bot.on('photo', (msg) => paymentHandler.handlePhotoUpload(bot, msg));
  
  // Handle text messages for payment input
  bot.on('message', async (msg) => {
    // Skip if not a text message
    if (!msg.text) return;
    
    // Skip commands, photos, button texts
    if (msg.text.startsWith('/') || 
        msg.text.includes('📸') || 
        msg.text.includes('📊') || 
        msg.text.includes('🏪') || 
        msg.text.includes('📅') || 
        msg.text.includes('❓')) {
      return;
    }
    
    // First, try to handle registration flow
    const wasHandled = await handleRegistration(bot, msg);
    if (wasHandled) {
      return; // Message was handled by registration
    }
    
    // Then, try to handle payment input
    paymentHandler.handlePaymentText(bot, msg);
  });
  
  console.log('✅ All handlers registered');
}

module.exports = { registerHandlers };
