async function startHandler(bot, msg) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const userName = msg.from.first_name || 'User';
  const userLastName = msg.from.last_name || '';
  const username = msg.from.username || '';
  
  // Create full name display
  const fullName = `${userName}${userLastName ? ' ' + userLastName : ''}`;
  const userDisplay = username ? `${fullName}-${username}` : fullName;
  
  const welcomeMessage = `
👋 សួស្តី ${userDisplay}! Welcome to Bakong Vendor Bot!

🎯 **What I can do:**
• 📸 Record KHQR payments (QR or Cash)
• 📊 Generate sales reports
• 🏪 Track sales by branch
• 💰 Real-time payment verification
• 💱 Show amounts in KHR and USD

**Quick Commands:**
/record - Record a new payment
/report - View sales reports
/daily - Today's sales summary
/branch - Select your branch
/help - Show this message

**Getting Started:**
1. Select your branch: /branch
2. Send payment amount and description
3. Choose payment method (QR or Cash)
4. Confirm transaction

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

// Helper function to check if user is admin
function isAdmin(userId) {
  const adminIds = process.env.ADMIN_USER_IDS?.split(',').map(id => parseInt(id.trim())) || [];
  return adminIds.includes(userId);
}

module.exports = startHandler;
