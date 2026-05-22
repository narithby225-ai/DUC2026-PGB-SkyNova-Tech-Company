require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { initDatabase } = require('./models');
const { registerHandlers } = require('./handlers');
const apiRoutes = require('./routes/api');
const logger = require('./utils/logger');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Check if bot token is configured
if (!process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN === 'your_telegram_bot_token_here') {
  logger.error('TELEGRAM_BOT_TOKEN not configured!');
  console.error('❌ TELEGRAM_BOT_TOKEN not configured!');
  console.log('\n📝 Please follow these steps:');
  console.log('1. Open Telegram and search for @BotFather');
  console.log('2. Send /newbot and follow instructions');
  console.log('3. Copy the token and add it to .env file');
  console.log('4. Update TELEGRAM_BOT_TOKEN in .env\n');
  process.exit(1);
}

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Initialize database
initDatabase().then(() => {
  logger.info('Database initialized successfully');
  console.log('✅ Database initialized');
}).catch(err => {
  logger.error('Database initialization failed', { error: err.message });
  console.error('❌ Database initialization failed:', err);
  process.exit(1);
});

// Register bot command handlers
registerHandlers(bot);

// API Routes
app.use('/api', apiRoutes);

// Express webhook endpoint (optional, for production)
app.post('/webhook/bakong', async (req, res) => {
  try {
    const { handleBakongWebhook } = require('./services/bakongService');
    await handleBakongWebhook(req.body, bot);
    logger.info('Bakong webhook processed', { data: req.body });
    res.sendStatus(200);
  } catch (error) {
    logger.error('Bakong webhook error', { error: error.message });
    res.sendStatus(500);
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  const dbType = process.env.DATABASE_TYPE || 'json';
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    database: dbType,
    uptime: process.uptime(),
    version: require('../package.json').version
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Bakong Vendor Bot API',
    version: require('../package.json').version,
    status: 'running',
    endpoints: {
      health: '/health',
      api: '/api',
      branches: '/api/branches',
      transactions: '/api/transactions',
      dailyReport: '/api/reports/daily',
      stats: '/api/stats'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  logger.error('Express error', { error: err.message, stack: err.stack });
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  logger.info(`Server started on ${HOST}:${PORT}`);
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
  console.log('🤖 Telegram bot is active');
  console.log(`📊 API available at http://${HOST}:${PORT}/api`);
  console.log(`💾 Database: ${process.env.DATABASE_TYPE || 'json'}`);
});

// Graceful shutdown
const shutdown = async () => {
  logger.info('Shutting down gracefully...');
  console.log('\n👋 Shutting down gracefully...');
  
  try {
    bot.stopPolling();
    
    // Close database connection if using MongoDB
    if (process.env.DATABASE_TYPE === 'mongodb') {
      const { disconnectDB } = require('./models/mongodb');
      await disconnectDB();
    }
    
    logger.info('Shutdown complete');
    process.exit(0);
  } catch (error) {
    logger.error('Error during shutdown', { error: error.message });
    process.exit(1);
  }
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
