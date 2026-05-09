const axios = require('axios');

const BAKONG_API_URL = process.env.BAKONG_API_URL;
const BAKONG_API_KEY = process.env.BAKONG_API_KEY;
const BAKONG_MERCHANT_ID = process.env.BAKONG_MERCHANT_ID;

/**
 * Verify KHQR payment with Bakong API
 * @param {string} transactionId - Transaction ID from KHQR
 * @returns {Promise<Object>} Verification result
 */
async function verifyKHQRPayment(transactionId) {
  try {
    const response = await axios.get(
      `${BAKONG_API_URL}/v1/transactions/${transactionId}`,
      {
        headers: {
          'Authorization': `Bearer ${BAKONG_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Bakong verification error:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Generate KHQR code for merchant
 * @param {number} amount - Payment amount
 * @param {string} description - Payment description
 * @returns {Promise<Object>} KHQR data
 */
async function generateKHQR(amount, description) {
  try {
    const response = await axios.post(
      `${BAKONG_API_URL}/v1/khqr/generate`,
      {
        merchantId: BAKONG_MERCHANT_ID,
        amount: amount,
        currency: 'KHR',
        description: description
      },
      {
        headers: {
          'Authorization': `Bearer ${BAKONG_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return {
      success: true,
      qrCode: response.data.qrCode,
      qrString: response.data.qrString
    };
  } catch (error) {
    console.error('KHQR generation error:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Handle Bakong webhook notifications
 * @param {Object} payload - Webhook payload
 * @param {Object} bot - Telegram bot instance
 */
async function handleBakongWebhook(payload, bot) {
  try {
    const { transactionId, amount, status, merchantId } = payload;
    
    if (merchantId !== BAKONG_MERCHANT_ID) {
      console.warn('Webhook for different merchant:', merchantId);
      return;
    }
    
    // Update transaction status in database
    const { Transaction } = require('../models');
    const transaction = await Transaction.findOne({
      where: { transactionId }
    });
    
    if (transaction) {
      transaction.verificationStatus = status === 'completed' ? 'verified' : 'failed';
      await transaction.save();
      
      // Notify user via Telegram
      // Implementation depends on how you track user chat IDs
    }
    
  } catch (error) {
    console.error('Webhook handling error:', error);
  }
}

module.exports = {
  verifyKHQRPayment,
  generateKHQR,
  handleBakongWebhook
};
