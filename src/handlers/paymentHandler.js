const { Transaction, Branch } = require('../models');
const { verifyKHQRPayment } = require('../services/bakongService');
const { extractPaymentInfo } = require('../utils/qrUtils');

async function recordPayment(bot, msg) {
  const chatId = msg.chat.id;
  
  await bot.sendMessage(chatId, 
    '📸 Please send a screenshot of the KHQR payment confirmation.\n\n' +
    'Make sure the screenshot includes:\n' +
    '✅ Transaction ID\n' +
    '✅ Amount\n' +
    '✅ Date & Time\n' +
    '✅ Payment status'
  );
}

async function handlePhotoUpload(bot, msg) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  
  try {
    await bot.sendMessage(chatId, '⏳ Processing your payment screenshot...');
    
    // Get the highest resolution photo
    const photo = msg.photo[msg.photo.length - 1];
    const fileId = photo.file_id;
    
    // Download and process the image
    const file = await bot.getFile(fileId);
    const filePath = file.file_path;
    
    // TODO: Implement OCR or manual input for payment details
    // For now, ask user to input details manually
    
    await bot.sendMessage(chatId, 
      '📝 Please provide payment details:\n\n' +
      'Format: AMOUNT BRANCH_NAME DESCRIPTION\n' +
      'Example: 25000 Branch1 2x Fried Rice\n\n' +
      'Or use /cancel to cancel'
    );
    
    // Store photo file_id for later reference
    // In production, you'd store this in a temporary session
    
  } catch (error) {
    console.error('Error processing photo:', error);
    await bot.sendMessage(chatId, 
      '❌ Error processing image. Please try again or use /record to enter details manually.'
    );
  }
}

async function confirmPayment(bot, query) {
  const chatId = query.message.chat.id;
  const data = query.data;
  
  if (data === 'confirm_yes') {
    // Save transaction to database
    await bot.sendMessage(chatId, '✅ Payment recorded successfully!');
  } else {
    await bot.sendMessage(chatId, '❌ Payment recording cancelled.');
  }
  
  await bot.answerCallbackQuery(query.id);
}

module.exports = {
  recordPayment,
  handlePhotoUpload,
  confirmPayment
};
