# 🚀 START HERE - Version 2.0

## Welcome to Your Upgraded Bot! 🎉

Your Bakong Vendor Bot now supports **24/7 operation** and **multi-device testing**!

---

## ⚡ Quick Start (Choose One)

### 🎯 Option 1: Simple Testing (5 minutes)
**Best for:** Quick testing on your computer

```bash
npm start
```

✅ Done! Open http://localhost:3000

---

### 🌐 Option 2: Multi-Device Testing (15 minutes)
**Best for:** Testing from multiple phones/computers

**Step 1:** Get MongoDB
- Free cloud: https://www.mongodb.com/cloud/atlas
- Or local: https://www.mongodb.com/try/download/community

**Step 2:** Configure
```bash
# Edit .env file:
DATABASE_TYPE=mongodb
MONGODB_URI=your_mongodb_connection_string
```

**Step 3:** Run
```bash
npm start
```

**Step 4:** Get your IP
```bash
ipconfig
# Look for IPv4 Address (e.g., 192.168.1.100)
```

**Step 5:** Access from any device
```
http://192.168.1.100:3000
```

✅ Done! All devices can now access the bot!

---

### 🚀 Option 3: 24/7 Production (20 minutes)
**Best for:** Running bot 24/7 with auto-restart

```bash
# Windows
start-production.bat

# Linux/Mac
npm run start:pm2
```

✅ Done! Bot runs 24/7 and auto-restarts!

---

## 📚 Documentation

| Document | What's Inside | When to Read |
|----------|---------------|--------------|
| **QUICK_SETUP.md** | All setup options in detail | Starting setup |
| **DEPLOYMENT_GUIDE.md** | Complete deployment guide | Deploying to production |
| **TESTING_GUIDE.md** | How to test from multiple devices | Testing phase |
| **UPGRADE_SUMMARY.md** | What's new in v2.0 | Understanding changes |
| **ARCHITECTURE.md** | System architecture diagrams | Understanding how it works |

---

## 🆕 What's New?

### ✨ New Features
1. **Dual Database Support** - JSON or MongoDB
2. **REST API** - Test from any device
3. **24/7 Operation** - PM2 process manager
4. **Docker Support** - Easy deployment
5. **Enhanced Logging** - Professional logs
6. **Security** - Rate limiting, CORS, Helmet

### 📊 New API Endpoints
- `GET /api/branches` - List branches
- `GET /api/transactions` - List transactions
- `POST /api/transactions` - Create transaction
- `GET /api/reports/daily` - Daily report
- `GET /api/stats` - Statistics

### 🛠️ New Commands
```bash
npm run start:pm2    # Start with PM2
npm run stop:pm2     # Stop PM2
npm run restart:pm2  # Restart PM2
npm run logs:pm2     # View logs
npm run monit:pm2    # Monitor resources
```

---

## 🧪 Quick Test

### Test Telegram Bot
1. Open Telegram
2. Search for your bot
3. Send `/start`
4. Try `/record 25000 Test payment`

### Test API
Open browser:
- http://localhost:3000
- http://localhost:3000/api/branches
- http://localhost:3000/api/transactions

### Test from Another Device
Replace `localhost` with your IP:
- http://192.168.1.100:3000

---

## 🎯 Recommended Setup

| Your Goal | Recommended Option | Database |
|-----------|-------------------|----------|
| Quick testing | Option 1 | JSON |
| Team testing (same office) | Option 2 | MongoDB Local |
| Team testing (remote) | Option 2 | MongoDB Atlas |
| Production (24/7) | Option 3 | MongoDB Atlas |
| Easy deployment | Docker | MongoDB |

---

## 🆘 Need Help?

### Common Issues

**Issue:** Can't install dependencies
```bash
npm install
```

**Issue:** MongoDB connection failed
```bash
# Switch to JSON in .env:
DATABASE_TYPE=json
```

**Issue:** Port 3000 in use
```bash
# Change port in .env:
PORT=3001
```

**Issue:** Can't access from other devices
1. Check firewall (allow port 3000)
2. Ensure `HOST=0.0.0.0` in .env
3. Use correct IP address
4. Both devices on same WiFi

### Get More Help
- Read **QUICK_SETUP.md** for detailed instructions
- Read **TESTING_GUIDE.md** for testing help
- Check **DEPLOYMENT_GUIDE.md** for deployment help

---

## 📋 Checklist

Before you start:
- [ ] Node.js installed (v14+)
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file configured
- [ ] Telegram bot token added
- [ ] Database choice made (JSON or MongoDB)

After starting:
- [ ] Bot responds to `/start` in Telegram
- [ ] http://localhost:3000 shows API info
- [ ] Can access from other devices (if needed)
- [ ] Logs are being written

---

## 🎊 You're Ready!

Choose your setup option above and get started!

**All existing features still work exactly the same.**

The bot just got better with:
- ✅ 24/7 operation
- ✅ Multi-device support
- ✅ REST API access
- ✅ Better monitoring
- ✅ Enhanced security

---

## 📞 Support

- **Quick Setup:** QUICK_SETUP.md
- **Deployment:** DEPLOYMENT_GUIDE.md
- **Testing:** TESTING_GUIDE.md
- **Architecture:** ARCHITECTURE.md
- **What's New:** UPGRADE_SUMMARY.md

---

**Made with ❤️ by SkyNova Tech Company**

**Let's build something amazing! 🚀**
