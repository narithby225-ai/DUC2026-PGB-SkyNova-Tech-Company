const { User } = require('../models/simpleDB');
const { STATES, getUserState, setUserState, clearUserState, validatePhone, formatPhone } = require('../utils/userState');

/**
 * Handle registration flow
 */
async function handleRegistration(bot, msg) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = msg.text;
  
  const userState = getUserState(userId);
  
  // Handle based on current state
  switch (userState.state) {
    case STATES.WAIT_NAME:
      await handleNameInput(bot, msg, text);
      break;
      
    case STATES.WAIT_PHONE:
      await handlePhoneInput(bot, msg, text);
      break;
      
    default:
      // Not in registration flow
      return false;
  }
  
  return true; // Message was handled
}

/**
 * Handle name input
 */
async function handleNameInput(bot, msg, text) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  
  // Validate name (at least 2 characters)
  if (text.trim().length < 2) {
    await bot.sendMessage(chatId, 
      '❌ Name is too short. Please enter your full name (at least 2 characters):'
    );
    return;
  }
  
  // Save name and move to next state
  setUserState(userId, STATES.WAIT_PHONE, { fullName: text.trim() });
  
  await bot.sendMessage(chatId, 
    `✅ Name saved: **${text.trim()}**\n\n` +
    `📱 Now, please enter your **phone number**:\n\n` +
    `Accepted formats:\n` +
    `• 012 345 678\n` +
    `• 012345678\n` +
    `• +855 12 345 678\n` +
    `• 855 12 345 678`,
    { parse_mode: 'Markdown' }
  );
}

/**
 * Handle phone input
 */
async function handlePhoneInput(bot, msg, text) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const userState = getUserState(userId);
  
  // Validate phone number
  if (!validatePhone(text)) {
    await bot.sendMessage(chatId, 
      '❌ Invalid phone number format.\n\n' +
      'Please enter a valid Cambodian phone number:\n' +
      '• 012 345 678\n' +
      '• +855 12 345 678\n\n' +
      'Try again:'
    );
    return;
  }
  
  // Format and save phone number
  const formattedPhone = formatPhone(text);
  
  // Save user to database
  try {
    await User.upsert({
      telegramId: userId,
      username: msg.from.username,
      firstName: msg.from.first_name,
      lastName: msg.from.last_name,
      fullName: userState.data.fullName,
      phoneNumber: formattedPhone
    });
    
    // Clear registration state
    clearUserState(userId);
    
    // Show success message with keyboard
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
    
    const username = msg.from.username || '';
    const userDisplay = username ? `${userState.data.fullName}-${username}` : userState.data.fullName;
    
    await bot.sendMessage(chatId, 
      `✅ **Registration Complete!**\n\n` +
      `👤 Name: ${userState.data.fullName}\n` +
      `📱 Phone: ${formattedPhone}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `👋 សួស្តី ${userDisplay}! Welcome to Bakong Vendor Bot!\n\n` +
      `🎯 **What I can do:**\n` +
      `• 📸 Record KHQR payments (QR or Cash)\n` +
      `• 📊 Generate sales reports\n` +
      `• 🏪 Track sales by branch\n` +
      `• 💰 Real-time payment verification\n` +
      `• 💱 Show amounts in KHR and USD\n\n` +
      `**Quick Commands:**\n` +
      `/record - Record a new payment\n` +
      `/report - View sales reports\n` +
      `/daily - Today's sales summary\n` +
      `/branch - Select your branch\n` +
      `/help - Show this message\n\n` +
      `**Getting Started:**\n` +
      `1. Select your branch: /branch\n` +
      `2. Send payment amount and description\n` +
      `3. Choose payment method (QR or Cash)\n` +
      `4. Confirm transaction\n\n` +
      `Let's get started! 🚀`,
      { parse_mode: 'Markdown', ...keyboard }
    );
    
  } catch (error) {
    console.error('Error saving user:', error);
    await bot.sendMessage(chatId, 
      '❌ Error saving your information. Please try again with /start'
    );
    clearUserState(userId);
  }
}

module.exports = {
  handleRegistration
};
