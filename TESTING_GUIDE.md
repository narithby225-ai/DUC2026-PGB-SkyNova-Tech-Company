# 🧪 Testing Guide - Multi-Device Testing

This guide explains how to test the bot from multiple devices with a centralized database.

## 📋 Table of Contents
1. [Quick Testing Setup](#quick-testing-setup)
2. [Testing from Same Network](#testing-from-same-network)
3. [Testing from Internet](#testing-from-internet)
4. [API Testing](#api-testing)
5. [Telegram Bot Testing](#telegram-bot-testing)

---

## 🚀 Quick Testing Setup

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Choose Database Type

**Option A: JSON (Simple - Single Device)**
```bash
# In .env file:
DATABASE_TYPE=json
```

**Option B: MongoDB (Recommended - Multi-Device)**
```bash
# In .env file:
DATABASE_TYPE=mongodb
MONGODB_URI=mongodb://localhost:27017/bakong-bot

# Or use MongoDB Atlas (cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bakong-bot
```

### Step 3: Start the Server

```bash
# Development mode
npm run dev

# Production mode (24/7)
npm run start:pm2
```

---

## 🏠 Testing from Same Network (Local Network)

### Setup Server (Main Computer)

**1. Find your local IP address:**

```bash
# Windows
ipconfig
# Look for "IPv4 Address" (e.g., 192.168.1.100)

# Linux/Mac
ifconfig
# or
ip addr show
```

**2. Configure firewall:**

Windows:
- Open Windows Defender Firewall
- Click "Advanced settings"
- Click "Inbound Rules" → "New Rule"
- Select "Port" → Next
- TCP, Specific port: 3000 → Next
- Allow the connection → Next
- Check all profiles → Next
- Name: "Bakong Bot" → Finish

**3. Start the server:**

```bash
npm start
```

The server will be accessible at: `http://YOUR_LOCAL_IP:3000`

### Test from Other Devices (Same Network)

**From Phone/Tablet:**

1. Connect to the same WiFi network
2. Open browser and go to: `http://192.168.1.100:3000`
   (Replace with your actual IP)
3. You should see the API welcome page

**From Another Computer:**

1. Connect to the same WiFi network
2. Open terminal/command prompt
3. Test the API:

```bash
# Health check
curl http://192.168.1.100:3000/health

# Get branches
curl http://192.168.1.100:3000/api/branches

# Get transactions
curl http://192.168.1.100:3000/api/transactions
```

---

## 🌐 Testing from Internet (Remote Access)

### Option 1: Using ngrok (Temporary - Free)

**1. Install ngrok:**
- Download from: https://ngrok.com/download
- Or install via npm: `npm install -g ngrok`

**2. Start your bot:**
```bash
npm start
```

**3. Start ngrok:**
```bash
ngrok http 3000
```

**4. Use the provided URL:**
```
Forwarding: https://abc123.ngrok.io -> http://localhost:3000
```

Now anyone can access your bot at: `https://abc123.ngrok.io`

**Test from any device:**
```bash
curl https://abc123.ngrok.io/health
curl https://abc123.ngrok.io/api/branches
```

### Option 2: Cloud Deployment (Permanent)

Deploy to a cloud provider:
- **DigitalOcean** ($5/month)
- **AWS EC2** (Free tier available)
- **Heroku** (Free tier available)
- **Railway.app** (Free tier available)

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

---

## 🔌 API Testing

### Using cURL (Command Line)

**1. Health Check:**
```bash
curl http://localhost:3000/health
```

**2. Get All Branches:**
```bash
curl http://localhost:3000/api/branches
```

**3. Get Transactions:**
```bash
curl http://localhost:3000/api/transactions
```

**4. Create Transaction:**
```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d "{\"branchId\":1,\"amount\":25000,\"description\":\"Test payment\",\"paymentMethod\":\"KHQR\"}"
```

**5. Get Daily Report:**
```bash
curl http://localhost:3000/api/reports/daily
```

**6. Get Statistics:**
```bash
curl http://localhost:3000/api/stats
```

### Using Postman

**1. Import Collection:**

Create a new collection with these requests:

**GET Health Check**
```
GET http://localhost:3000/health
```

**GET Branches**
```
GET http://localhost:3000/api/branches
```

**GET Transactions**
```
GET http://localhost:3000/api/transactions
```

**POST Create Transaction**
```
POST http://localhost:3000/api/transactions
Content-Type: application/json

{
  "branchId": 1,
  "amount": 25000,
  "description": "Test payment from Postman",
  "paymentMethod": "KHQR",
  "currency": "KHR"
}
```

**GET Daily Report**
```
GET http://localhost:3000/api/reports/daily
```

### Using Browser

Simply open these URLs in your browser:

- http://localhost:3000/
- http://localhost:3000/health
- http://localhost:3000/api/branches
- http://localhost:3000/api/transactions
- http://localhost:3000/api/reports/daily
- http://localhost:3000/api/stats

---

## 🤖 Telegram Bot Testing

### Setup

**1. Create Bot:**
- Open Telegram
- Search for `@BotFather`
- Send `/newbot`
- Follow instructions
- Copy the token

**2. Configure:**
```bash
# In .env file:
TELEGRAM_BOT_TOKEN=your_actual_token_here
```

**3. Start Bot:**
```bash
npm start
```

### Test Commands

**1. Start the bot:**
- Open Telegram
- Search for your bot name
- Send `/start`

**2. Select Branch:**
- Click "🏪 Select Branch"
- Or send `/branch`
- Choose a branch

**3. Record Payment:**
- Click "📸 Record Payment"
- Or send `/record`
- Enter: `25000 Test payment`

**4. View Daily Summary:**
- Click "📅 Daily Summary"
- Or send `/daily`

**5. View Reports:**
- Send `/report`
- Choose report type

### Multi-User Testing

**Test with multiple Telegram accounts:**

1. Start bot on main computer
2. Open Telegram on phone → test bot
3. Open Telegram on another device → test bot
4. All transactions should sync in real-time

**Verify data sync:**
```bash
# Check transactions from API
curl http://localhost:3000/api/transactions

# All devices should see the same data
```

---

## 🧪 Testing Scenarios

### Scenario 1: Multiple Staff Recording Payments

**Setup:**
- 3 devices (Phone A, Phone B, Computer)
- All connected to same bot

**Test:**
1. Phone A: Record payment (10,000 KHR)
2. Phone B: Record payment (15,000 KHR)
3. Computer: Record payment (20,000 KHR)
4. All devices: Check `/daily` report
5. **Expected:** Total = 45,000 KHR, 3 transactions

### Scenario 2: Branch-Specific Reporting

**Test:**
1. Device A: Select "Central Market" → Record 10,000 KHR
2. Device B: Select "Russian Market" → Record 15,000 KHR
3. Both devices: Check `/daily` report
4. **Expected:** 
   - Central Market: 10,000 KHR
   - Russian Market: 15,000 KHR

### Scenario 3: API + Bot Integration

**Test:**
1. Create transaction via API:
   ```bash
   curl -X POST http://localhost:3000/api/transactions \
     -H "Content-Type: application/json" \
     -d '{"branchId":1,"amount":50000,"description":"API test"}'
   ```
2. Check Telegram bot: `/daily`
3. **Expected:** Transaction appears in bot report

### Scenario 4: 24/7 Operation

**Test:**
1. Start bot with PM2: `npm run start:pm2`
2. Record some transactions
3. Restart computer
4. Check if bot auto-starts (if configured)
5. Verify data persistence

---

## 🔍 Troubleshooting

### Can't Connect from Other Devices

**Check:**
1. Both devices on same network?
2. Firewall blocking port 3000?
3. Using correct IP address?
4. Server actually running?

**Test:**
```bash
# On server computer
netstat -an | findstr 3000

# Should show: 0.0.0.0:3000 or :::3000
```

### Database Not Syncing

**MongoDB:**
```bash
# Check connection
mongosh "mongodb://localhost:27017/bakong-bot"

# List collections
show collections

# Count transactions
db.transactions.countDocuments()
```

**JSON:**
- Check `data/transactions.json` file
- Ensure file permissions are correct
- Only one instance should run with JSON

### Bot Not Responding

**Check:**
1. Bot token correct?
2. Internet connection working?
3. Check logs: `pm2 logs bakong-bot`
4. Restart bot: `pm2 restart bakong-bot`

---

## 📊 Monitoring

### PM2 Monitoring

```bash
# View status
pm2 status

# View logs
pm2 logs bakong-bot

# Monitor resources
pm2 monit

# View detailed info
pm2 show bakong-bot
```

### API Monitoring

```bash
# Continuous health check
while true; do curl http://localhost:3000/health; sleep 5; done

# Watch logs
tail -f logs/combined.log
```

---

## ✅ Testing Checklist

- [ ] Server starts without errors
- [ ] Health endpoint responds
- [ ] Can access from same network
- [ ] Telegram bot responds to /start
- [ ] Can select branch
- [ ] Can record payment
- [ ] Daily report shows correct data
- [ ] API endpoints return data
- [ ] Multiple devices can connect
- [ ] Data syncs across devices
- [ ] Bot survives restart (PM2)
- [ ] Logs are being written

---

## 📞 Support

If you encounter issues:
1. Check logs: `pm2 logs bakong-bot`
2. Review this guide
3. Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
4. Open GitHub issue

---

**Made with ❤️ by SkyNova Tech Company**
