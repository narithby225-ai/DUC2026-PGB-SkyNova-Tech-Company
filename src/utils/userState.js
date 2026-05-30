/**
 * User State Management
 * Tracks user registration state
 */

// In-memory state storage (in production, use Redis or database)
const userStates = new Map();

// State constants
const STATES = {
  IDLE: 'IDLE',
  WAIT_NAME: 'WAIT_NAME',
  WAIT_PHONE: 'WAIT_PHONE'
};

/**
 * Get user's current state
 */
function getUserState(userId) {
  return userStates.get(userId) || { state: STATES.IDLE, data: {} };
}

/**
 * Set user's state
 */
function setUserState(userId, state, data = {}) {
  const currentState = getUserState(userId);
  userStates.set(userId, {
    state,
    data: { ...currentState.data, ...data }
  });
}

/**
 * Clear user's state
 */
function clearUserState(userId) {
  userStates.delete(userId);
}

/**
 * Validate phone number
 * Cambodian phone format: 0XX XXX XXX or +855 XX XXX XXX
 */
function validatePhone(phone) {
  // Remove spaces and dashes
  const cleaned = phone.replace(/[\s-]/g, '');
  
  // Cambodian phone patterns
  const patterns = [
    /^0\d{8,9}$/,           // 0XX XXX XXX (9-10 digits)
    /^\+855\d{8,9}$/,       // +855 XX XXX XXX
    /^855\d{8,9}$/          // 855 XX XXX XXX
  ];
  
  return patterns.some(pattern => pattern.test(cleaned));
}

/**
 * Format phone number
 */
function formatPhone(phone) {
  const cleaned = phone.replace(/[\s-]/g, '');
  
  // Convert to standard format
  if (cleaned.startsWith('0')) {
    return cleaned;
  } else if (cleaned.startsWith('+855')) {
    return '0' + cleaned.substring(4);
  } else if (cleaned.startsWith('855')) {
    return '0' + cleaned.substring(3);
  }
  
  return cleaned;
}

module.exports = {
  STATES,
  getUserState,
  setUserState,
  clearUserState,
  validatePhone,
  formatPhone
};
