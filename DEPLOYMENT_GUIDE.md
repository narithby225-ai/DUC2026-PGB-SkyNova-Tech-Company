# 🚀 Deployment Guide - 24/7 Multi-Device Access

This guide will help you deploy the bot for 24/7 operation with centralized database access.

## 📋 Table of Contents
1. [Quick Setup (Local Testing)](#quick-setup-local-testing)
2. [Production Deployment](#production-deployment)
3. [Database Options](#database-options)
4. [Testing from Multiple Devices](#testing-from-multiple-devices)

---

## 🎯 Quick Setup (Local Testing)

### Option 1: Using MongoDB (Recommended)

**Step 1: Install MongoDB**

**Windows:**
```bash
# Download MongoDB Community Server from:
# https://www.mongodb.com/try/download/community
# Or use MongoDB Atlas (cloud) - free tier available
```

**Step 2: Configure Environment**
```bash
# Copy .env.example to .env
copy .env.example .env

# Edit .env and add:
DATABASE_TYPE=mongodb
MONGODB_URI=mongodb://localhost:27017/bakong-bot
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bakong-bot
```

**Step 3: Install Dependencies**
```bash
npm install
```

**Step 4: Run the Bot**
```bash
# Development mode
npm run dev

# Production mode with PM2 (24/7)
npm install -g pm2
npm run start:pm2
```

### Option 2: Using JSON Files (Simple)

```bash
# In .env file:
DATABASE_TYPE=json

# Run normally
npm start
```

---

## 🌐 Production Deployment

### Method 1: VPS/Cloud Server (Recommended for 24/7)

**Providers:**
- DigitalOcean ($5/month)
- AWS EC2 (Free tier available)
- Google Cloud Platform
- Heroku
- Railway.app

**Setup Steps:**

1. **Connect to your server**
```bash
ssh user@your-server-ip
```

2. **Install Node.js and MongoDB**
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB (or use MongoDB Atlas)
sudo apt-get install -y mongodb
```

3. **Clone and setup project**
```bash
git clone https://github.com/your-repo/bakong-vendor-bot.git
cd bakong-vendor-bot
npm install
```

4. **Configure environment**
```bash
nano .env
# Add your configuration
```

5. **Start with PM2 (24/7 operation)**
```bash
npm install -g pm2
pm2 start src/app.js --name bakong-bot
pm2 save
pm2 startup
```

6. **Monitor the bot**
```bash
pm2 status
pm2 logs bakong-bot
pm2 monit
```

### Method 2: Docker Deployment

**Step 1: Build Docker image**
```bash
docker build -t bakong-bot .
```

**Step 2: Run with Docker Compose**
```bash
docker-compose up -d
```

This will start:
- The bot application
- MongoDB database
- Automatic restart on failure

**Step 3: View logs**
```bash
docker-compose logs -f
```

---

## 💾 Database Options

### Option 1: MongoDB Atlas (Cloud - Recommended)

**Advantages:**
- ✅ Free tier available (512MB)
- ✅ Accessible from anywhere
- ✅ Automatic backups
- ✅ No server maintenance

**Setup:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create cluster (M0 Free tier)
4. Create database user
5. Whitelist IP addresses (or use 0.0.0.0/0 for all)
6. Get connection string
7. Add to `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bakong-bot
```

### Option 2: Local MongoDB

**Advantages:**
- ✅ Full control
- ✅ No internet required
- ✅ Faster for local testing

**Setup:**
```bash
# Windows: Download from mongodb.com
# Linux:
sudo apt-get install mongodb

# Start MongoDB
mongod --dbpath /path/to/data

# In .env:
MONGODB_URI=mongodb://localhost:27017/bakong-bot
```

### Option 3: JSON Files (Development Only)

**Advantages:**
- ✅ No setup required
- ✅ Simple for testing

**Limitations:**
- ❌ Not suitable for multiple devices
- ❌ No concurrent access
- ❌ Limited scalability

```env
DATABASE_TYPE=json
```

---

## 🔌 Testing from Multiple Devices

### Setup API Access

The bot includes REST API endpoints for testing:

**1. Start the server**
```bash
npm start
```

**2. Get your server IP address**
```bash
# Windows
ipconfig

# Linux/Mac
ifconfig
```

**3. Test from another device**

**Health Check:**
```bash
curl http://YOUR_SERVER_IP:3000/health
```

**Get Branches:**
```bash
curl http://YOUR_SERVER_IP:3000/api/branches
```

**Get Transactions:**
```bash
curl http://YOUR_SERVER_IP:3000/api/transactions
```

**Create Transaction (POST):**
```bash
curl -X POST http://YOUR_SERVER_IP:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "branchId": 1,
    "amount": 25000,
    "description": "Test payment",
    "paymentMethod": "KHQR"
  }'
```

### Network Configuration

**For Local Network Testing:**
1. Ensure firewall allows port 3000
2. All devices must be on same network
3. Use local IP address (e.g., 192.168.1.100:3000)

**For Internet Access:**
1. Deploy to cloud server (VPS)
2. Or use ngrok for temporary public URL:
```bash
npm install -g ngrok
ngrok http 3000
# Use the provided URL (e.g., https://abc123.ngrok.io)
```

---

## 📊 Monitoring & Maintenance

### PM2 Commands

```bash
# View status
pm2 status

# View logs
pm2 logs bakong-bot

# Restart bot
pm2 restart bakong-bot

# Stop bot
pm2 stop bakong-bot

# Monitor resources
pm2 monit

# View detailed info
pm2 show bakong-bot
```

### Database Backup

**MongoDB:**
```bash
# Backup
mongodump --uri="mongodb://localhost:27017/bakong-bot" --out=/backup/path

# Restore
mongorestore --uri="mongodb://localhost:27017/bakong-bot" /backup/path/bakong-bot
```

**JSON Files:**
```bash
# Simply copy the data folder
cp -r data/ backup/data-$(date +%Y%m%d)/
```

---

## 🔒 Security Recommendations

1. **Environment Variables**
   - Never commit `.env` file
   - Use strong passwords
   - Rotate tokens regularly

2. **Database Security**
   - Use authentication
   - Whitelist IP addresses
   - Enable SSL/TLS

3. **Server Security**
   - Keep system updated
   - Use firewall
   - Enable fail2ban
   - Use SSH keys

4. **Bot Security**
   - Implement rate limiting
   - Validate user input
   - Log suspicious activity

---

## 🆘 Troubleshooting

### Bot Not Starting

```bash
# Check logs
pm2 logs bakong-bot

# Common issues:
# 1. Invalid bot token
# 2. Database connection failed
# 3. Port already in use
```

### Database Connection Issues

```bash
# Test MongoDB connection
mongosh "mongodb://localhost:27017/bakong-bot"

# Check if MongoDB is running
sudo systemctl status mongodb
```

### Can't Access from Other Devices

```bash
# Check if server is listening
netstat -an | findstr 3000

# Check firewall
# Windows: Windows Defender Firewall settings
# Linux: sudo ufw allow 3000
```

---

## 📞 Support

For issues:
1. Check logs: `pm2 logs bakong-bot`
2. Review this guide
3. Check GitHub issues
4. Contact support team

---

**Made with ❤️ by SkyNova Tech Company**
