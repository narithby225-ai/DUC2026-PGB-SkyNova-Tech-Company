const QRCode = require('qrcode');

/**
 * Generate QR code image from string
 * @param {string} text - Text to encode
 * @returns {Promise<Buffer>} QR code image buffer
 */
async function generateQRImage(text) {
  try {
    const buffer = await QRCode.toBuffer(text, {
      errorCorrectionLevel: 'H',
      type: 'png',
      width: 300
    });
    return buffer;
  } catch (error) {
    console.error('QR generation error:', error);
    throw error;
  }
}

/**
 * Extract payment information from KHQR screenshot (placeholder)
 * In production, this would use OCR or image processing
 * @param {string} imagePath - Path to image file
 * @returns {Promise<Object>} Extracted payment info
 */
async function extractPaymentInfo(imagePath) {
  // TODO: Implement OCR using Tesseract.js or similar
  // For now, return placeholder
  return {
    amount: null,
    transactionId: null,
    timestamp: null,
    success: false,
    message: 'OCR not implemented - please enter details manually'
  };
}

module.exports = {
  generateQRImage,
  extractPaymentInfo
};
