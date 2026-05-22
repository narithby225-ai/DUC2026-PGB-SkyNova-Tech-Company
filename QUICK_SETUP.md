# ⚡ Quick Setup - 24/7 Multi-Device Bot

Choose your setup based on your needs:

---

## 🎯 Option 1: Simple Testing (5 minutes)

**Best for:** Quick testing on one computer

```bash
# 1. Configure
copy .env.example .env
# Edit .env and add your TELEGRAM_BOT_TOKEN

# 2. Run
npm start
```

✅ **Done!** Bot is running on http://localhost:3000

---

## 🌐 Option 2: Multi-Device Testing (15 minutes)

**Best for:** Testing from multiple phones/computers on same WiFi

### Step 1: Setup MongoDB

**Option A: MongoDB Atlas (Cloud - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account (M0 Free tier)
3. Create cluster
4. Create database user
5. Whitelist all IPs: `0.0.0.0/0`
6. Get connection string

**Option B: Local MongoDB**
1. Download from https://www.mongodb.com/try/download/community
2. Install and start MongoDB

### Step 2: Configure

```bash
# Edit .env file:
DATABASE_TYPE=mongodb

# For MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bakong-bot

# For Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/bakong-bot
```

### Step 3: Run

```bash
npm start
```

### Step 4: Get Your IP

```bash
# Windows
ipconfig
# Look for IPv4 Address (e.g., 192.168.1.100)
```

### Step 5: Test from Other Devices

Open browser on any device (same WiFi):
```
http://192.168.1.100:3000
```

✅ **Done!** All devices can now access the bot!

---

## 🚀 Option 3: 24/7 Production (20 minutes)

**Best for:** Running bot 24/7 with auto-restart

### Step 1: Setup MongoDB (see Option 2)

### Step 2: Configure

```bash
# Edit .env file:
DATABASE_TYPE=mongodb
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=production
```

### Step 3: Start with PM2

**Windows:**
```bash
start-production.bat
```

**Linux/Mac:**
```bash
npm run start:pm2
```

### Step 4: Configure Auto-Start (Optional)

```bash
pm2 save
pm2 startup
# Follow the instructions shown
```

### Step 5: Monitor

```bash
pm2 status          # View status
pm2 logs bakong-bot # View logs
pm2 monit           # Monitor resources
```

✅ **Done!** Bot runs 24/7 and auto-restarts on crash!

---

## 🐳 Option 4: Docker (10 minutes)

**Best for:** Easy deployment with everything included

### Step 1: Install Docker

Download from: https://www.docker.com/products/docker-desktop

### Step 2: Configure

```bash
# Edit .env file and add your TELEGRAM_BOT_TOKEN
```

### Step 3: Run

```bash
docker-compose up -d
```

### Step 4: Monitor

```bash
docker-compose logs -f
```

✅ **Done!** Bot + MongoDB running in containers!

---

## 🧪 Testing

### Test Telegram Bot

1. Open Telegram
2. Search for your bot
3. Send `/start`
4. Try recording a payment

### Test API

Open browser:
- http://localhost:3000 - API info
- http://localhost:3000/health - Health check
- http://localhost:3000/api/branches - View branches
- http://localhost:3000/api/transactions - View transactions

### Test from Another Device

Replace `localhost` with your IP address:
- http://192.168.1.100:3000

---

## 🆘 Quick Troubleshooting

### Bot not starting?

```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000

# Kill the process if needed
taskkill /PID <PID> /F
```

### Can't connect from other devices?

1. Check firewall (allow port 3000)
2. Ensure `HOST=0.0.0.0` in .env
3. Use correct IP address
4. Both devices on same WiFi

### MongoDB connection failed?

```bash
# Switch to JSON database
# In .env:
DATABASE_TYPE=json
```

---

## 📚 More Information

- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Detailed deployment guide
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Complete testing guide
- **[UPGRADE_NOTES.md](./UPGRADE_NOTES.md)** - What's new in v2.0

---

## 🎯 Recommended Setup by Use Case

| Use Case | Recommended Option | Database |
|----------|-------------------|----------|
| Quick testing | Option 1 | JSON |
| Team testing (same office) | Option 2 | MongoDB Local |
| Team testing (remote) | Option 2 | MongoDB Atlas |
| Production (24/7) | Option 3 | MongoDB Atlas |
| Easy deployment | Option 4 | Docker MongoDB |

---

**Need help?** Check the guides or open an issue on GitHub!

**Made with ❤️ by SkyNova Tech Company**
