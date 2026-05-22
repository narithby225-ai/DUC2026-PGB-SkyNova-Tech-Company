# 🚀 Version 2.0 Upgrade Notes

## What's New in Version 2.0?

This version adds **24/7 operation** and **multi-device support** with centralized database!

### ✨ New Features

#### 1. **Dual Database Support**
- ✅ **JSON Files** - Simple, for single-device testing
- ✅ **MongoDB** - Production-ready, multi-device access
- Switch between them with one environment variable

#### 2. **24/7 Operation with PM2**
- ✅ Auto-restart on crash
- ✅ Process monitoring
- ✅ Log management
- ✅ Daily auto-restart (optional)
- ✅ Startup on system boot

#### 3. **REST API for Testing**
- ✅ `/api/branches` - Get all branches
- ✅ `/api/transactions` - Get/Create transactions
- ✅ `/api/reports/daily` - Daily sales report
- ✅ `/api/stats` - Statistics
- ✅ Test from any device with HTTP client

#### 4. **Docker Support**
- ✅ Dockerfile for containerization
- ✅ Docker Compose with MongoDB
- ✅ One-command deployment
- ✅ Automatic health checks

#### 5. **Enhanced Logging**
- ✅ Winston logger integration
- ✅ Separate error and combined logs
- ✅ Log rotation (5MB max per file)
- ✅ Structured JSON logging

#### 6. **Security Improvements**
- ✅ Helmet.js for HTTP security
- ✅ CORS support
- ✅ Rate limiting (100 req/15min)
- ✅ Input validation

#### 7. **Better Monitoring**
- ✅ Health check endpoint
- ✅ Uptime tracking
- ✅ Database status
- ✅ PM2 monitoring dashboard

---

## 📦 Installation

### For Existing Users (Upgrading from v1.0)

**1. Backup your data:**
```bash
# Backup existing transactions
copy data\transactions.json data\transactions.backup.json
copy data\users.json data\users.backup.json
copy data\branches.json data\branches.backup.json
```

**2. Update dependencies:**
```bash
npm install
```

**3. Update .env file:**
```bash
# Copy new example
copy .env.example .env.new

# Add these new variables to your .env:
DATABASE_TYPE=json
HOST=0.0.0.0
LOG_LEVEL=info
MONGODB_URI=mongodb://localhost:27017/bakong-bot
```

**4. Test the upgrade:**
```bash
npm start
```

**5. Verify everything works:**
- Open browser: http://localhost:3000
- Test Telegram bot: Send `/start`
- Check API: http://localhost:3000/api/branches

### For New Users

Follow the [QUICKSTART.md](./QUICKSTART.md) guide.

---

## 🔄 Migration Guide

### Migrating from JSON to MongoDB

If you want to move your existing data to MongoDB:

**1. Install MongoDB:**
- Download from: https://www.mongodb.com/try/download/community
- Or use MongoDB Atlas (cloud)

**2. Start MongoDB:**
```bash
# Windows: MongoDB should start automatically
# Linux: sudo systemctl start mongodb
```

**3. Create migration script:**

Create `migrate.js`:
```javascript
require('dotenv').config();
const fs = require('fs');
const mongoose = require('mongoose');

async function migrate() {
  // Connect to MongoDB
  await mongoose.connect('mongodb://localhost:27017/bakong-bot');
  
  // Read JSON files
  const branches = JSON.parse(fs.readFileSync('./data/branches.json'));
  const users = JSON.parse(fs.readFileSync('./data/users.json'));
  const transactions = JSON.parse(fs.readFileSync('./data/transactions.json'));
  
  // Import models
  const { Branch, User, Transaction } = require('./src/models/mongodb');
  
  // Insert data
  await Branch.insertMany(branches);
  await User.insertMany(users);
  await Transaction.insertMany(transactions);
  
  console.log('Migration complete!');
  process.exit(0);
}

migrate().catch(console.error);
```

**4. Run migration:**
```bash
node migrate.js
```

**5. Update .env:**
```bash
DATABASE_TYPE=mongodb
MONGODB_URI=mongodb://localhost:27017/bakong-bot
```

**6. Restart bot:**
```bash
npm start
```

---

## 🎯 Quick Start Guides

### For Local Testing (Single Device)

```bash
# 1. Install
npm install

# 2. Configure
copy .env.example .env
# Edit .env and add your TELEGRAM_BOT_TOKEN

# 3. Run
npm start
```

### For Multi-Device Testing (Same Network)

```bash
# 1. Install
npm install

# 2. Configure for MongoDB
# In .env:
DATABASE_TYPE=mongodb
MONGODB_URI=mongodb://localhost:27017/bakong-bot

# 3. Install MongoDB
# Download from mongodb.com

# 4. Run
npm start

# 5. Get your IP
ipconfig

# 6. Test from other devices
# Open browser: http://YOUR_IP:3000
```

### For 24/7 Production

```bash
# 1. Install
npm install

# 2. Configure
copy .env.example .env
# Edit .env with production settings

# 3. Start with PM2
npm run start:pm2

# 4. Save PM2 config
pm2 save
pm2 startup

# 5. Monitor
pm2 monit
```

### For Docker Deployment

```bash
# 1. Build and run
docker-compose up -d

# 2. View logs
docker-compose logs -f

# 3. Stop
docker-compose down
```

---

## 📚 Documentation

- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Complete deployment instructions
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Multi-device testing guide
- **[README.md](./README.md)** - General information
- **[QUICKSTART.md](./QUICKSTART.md)** - Quick start guide

---

## 🔧 Configuration Options

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_TYPE` | `json` | Database type: `json` or `mongodb` |
| `MONGODB_URI` | - | MongoDB connection string |
| `PORT` | `3000` | Server port |
| `HOST` | `0.0.0.0` | Server host (0.0.0.0 = all interfaces) |
| `LOG_LEVEL` | `info` | Log level: error, warn, info, debug |
| `NODE_ENV` | `development` | Environment: development or production |

### PM2 Configuration

Edit `ecosystem.config.js` to customize:
- Memory limits
- Auto-restart settings
- Cron restart schedule
- Log file locations

---

## 🆘 Troubleshooting

### Issue: "Cannot find module 'mongoose'"

**Solution:**
```bash
npm install
```

### Issue: "MongoDB connection failed"

**Solutions:**
1. Check if MongoDB is running
2. Verify MONGODB_URI in .env
3. Or switch to JSON: `DATABASE_TYPE=json`

### Issue: "Port 3000 already in use"

**Solutions:**
```bash
# Change port in .env
PORT=3001

# Or kill existing process
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux:
lsof -ti:3000 | xargs kill
```

### Issue: "Can't access from other devices"

**Solutions:**
1. Check firewall settings
2. Ensure HOST=0.0.0.0 in .env
3. Use correct IP address
4. Both devices on same network

---

## 🔄 Rollback to v1.0

If you need to rollback:

**1. Restore backup:**
```bash
copy data\transactions.backup.json data\transactions.json
copy data\users.backup.json data\users.json
copy data\branches.backup.json data\branches.json
```

**2. Checkout v1.0:**
```bash
git checkout v1.0
npm install
```

**3. Run:**
```bash
npm start
```

---

## 📊 Performance Improvements

### v1.0 vs v2.0

| Feature | v1.0 | v2.0 |
|---------|------|------|
| Database | JSON only | JSON + MongoDB |
| Multi-device | ❌ No | ✅ Yes |
| 24/7 Operation | Manual | PM2 auto-restart |
| API Access | ❌ No | ✅ Yes |
| Logging | Console only | Winston + Files |
| Monitoring | ❌ No | PM2 + Health checks |
| Docker | ❌ No | ✅ Yes |
| Security | Basic | Helmet + Rate limiting |

---

## 🎉 What's Next?

### Planned Features (v2.1)

- [ ] Real-time notifications via WebSocket
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Automated backups
- [ ] User roles and permissions
- [ ] Export reports (PDF, Excel)

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## 📞 Support

- **Documentation:** Check the guides in this repository
- **Issues:** Open a GitHub issue
- **Email:** support@skynova-tech.com (if available)

---

**Made with ❤️ by SkyNova Tech Company**
