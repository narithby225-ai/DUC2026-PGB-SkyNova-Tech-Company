const { isAdmin } = require('../utils/authUtils');

async function startHandler(bot, msg) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const userName = msg.from.first_name || 'User';
  
  const welcomeMessage = `
👋 សួស្តី ${userName}! Welcome to Bakong Vendor Bot!

🎯 **What I can do:**
• 📸 Record KHQR payments (send screenshot)
• 📊 Generate sales reports
• 🏪 Track sales by branch
• 💰 Real-time payment verification

**Quick Commands:**
/record - Record a new payment
/report - View sales reports
/daily - Today's sales summary
/branch - Select your branch
/help - Show this message

${isAdmin(userId) ? '\n🔐 **Admin Access Granted**\n' : ''}

**Getting Started:**
1. Select your branch: /branch
2. Send KHQR payment screenshot
3. Confirm transaction details

Let's get started! 🚀
  `;
  
  const keyboard = {
    reply_markup: {
      keyboard: [
        ['📸 Record Payment', '📊 View Reports'],
        ['🏪 Select Branch', '📅 Daily Summary'],
        ['❓ Help']
      ],
      resize_keyboard: true
    }
  };
  
  await bot.sendMessage(chatId, welcomeMessage, { 
    parse_mode: 'Markdown',
    ...keyboard
  });
}

module.exports = startHandler;
