const startHandler = require('./startHandler');
const paymentHandler = require('./paymentHandler');
const reportHandler = require('./reportHandler');
const branchHandler = require('./branchHandler');

function registerHandlers(bot) {
  // Command handlers
  bot.onText(/\/start/, (msg) => startHandler(bot, msg));
  bot.onText(/\/help/, (msg) => startHandler(bot, msg));
  bot.onText(/\/record/, (msg) => paymentHandler.recordPayment(bot, msg));
  bot.onText(/\/report/, (msg) => reportHandler.generateReport(bot, msg));
  bot.onText(/\/daily/, (msg) => reportHandler.dailyReport(bot, msg));
  bot.onText(/\/branch/, (msg) => branchHandler.selectBranch(bot, msg));
  
  // Callback query handler for inline buttons
  bot.on('callback_query', async (query) => {
    const data = query.data;
    
    if (data.startsWith('branch_')) {
      await branchHandler.handleBranchSelection(bot, query);
    } else if (data.startsWith('confirm_')) {
      await paymentHandler.confirmPayment(bot, query);
    } else if (data.startsWith('report_')) {
      await reportHandler.handleReportType(bot, query);
    }
  });
  
  // Handle photo uploads (KHQR screenshots)
  bot.on('photo', (msg) => paymentHandler.handlePhotoUpload(bot, msg));
  
  console.log('✅ All handlers registered');
}

module.exports = { registerHandlers };
