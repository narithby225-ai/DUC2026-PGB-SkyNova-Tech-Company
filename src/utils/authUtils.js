/**
 * Check if user is admin
 * @param {number} userId - Telegram user ID
 * @returns {boolean}
 */
function isAdmin(userId) {
  const adminIds = process.env.ADMIN_USER_IDS?.split(',').map(id => parseInt(id.trim())) || [];
  return adminIds.includes(userId);
}

/**
 * Middleware to check admin access
 * @param {Object} bot - Telegram bot instance
 * @param {Object} msg - Telegram message
 * @param {Function} next - Next handler
 */
async function requireAdmin(bot, msg, next) {
  const userId = msg.from.id;
  
  if (!isAdmin(userId)) {
    await bot.sendMessage(msg.chat.id, '🔒 This command requires admin access.');
    return;
  }
  
  next();
}

module.exports = {
  isAdmin,
  requireAdmin
};
