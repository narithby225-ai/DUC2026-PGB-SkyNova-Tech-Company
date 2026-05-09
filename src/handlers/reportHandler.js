const { Transaction, Branch } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment-timezone');

async function generateReport(bot, msg) {
  const chatId = msg.chat.id;
  
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '📅 Today', callback_data: 'report_today' },
          { text: '📆 This Week', callback_data: 'report_week' }
        ],
        [
          { text: '📊 This Month', callback_data: 'report_month' },
          { text: '🏪 By Branch', callback_data: 'report_branch' }
        ]
      ]
    }
  };
  
  await bot.sendMessage(chatId, '📊 Select report type:', keyboard);
}

async function dailyReport(bot, msg) {
  const chatId = msg.chat.id;
  
  try {
    const today = moment().tz('Asia/Phnom_Penh').startOf('day');
    
    const transactions = await Transaction.findAll({
      where: {
        createdAt: {
          [Op.gte]: today.toDate()
        }
      },
      include: [Branch]
    });
    
    if (transactions.length === 0) {
      await bot.sendMessage(chatId, '📭 No transactions recorded today.');
      return;
    }
    
    // Calculate totals
    const totalAmount = transactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const branchTotals = {};
    
    transactions.forEach(t => {
      const branchName = t.Branch.name;
      if (!branchTotals[branchName]) {
        branchTotals[branchName] = 0;
      }
      branchTotals[branchName] += parseFloat(t.amount);
    });
    
    let report = `📅 **Daily Sales Report**\n`;
    report += `Date: ${today.format('DD/MM/YYYY')}\n\n`;
    report += `💰 **Total Sales:** ${totalAmount.toLocaleString()} KHR\n`;
    report += `📝 **Transactions:** ${transactions.length}\n\n`;
    report += `🏪 **By Branch:**\n`;
    
    for (const [branch, amount] of Object.entries(branchTotals)) {
      report += `• ${branch}: ${amount.toLocaleString()} KHR\n`;
    }
    
    await bot.sendMessage(chatId, report, { parse_mode: 'Markdown' });
    
  } catch (error) {
    console.error('Error generating daily report:', error);
    await bot.sendMessage(chatId, '❌ Error generating report. Please try again.');
  }
}

async function handleReportType(bot, query) {
  const chatId = query.message.chat.id;
  const reportType = query.data.replace('report_', '');
  
  await bot.answerCallbackQuery(query.id, { text: 'Generating report...' });
  
  // Generate specific report based on type
  // Implementation similar to dailyReport but with different date ranges
  
  await bot.sendMessage(chatId, `📊 ${reportType} report will be generated here.`);
}

module.exports = {
  generateReport,
  dailyReport,
  handleReportType
};
