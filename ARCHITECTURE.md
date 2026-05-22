# 🏗️ Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT DEVICES                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📱 Phone A          💻 Computer B        📱 Tablet C          │
│  (Telegram)          (Browser/API)        (Telegram)           │
│                                                                 │
└────────────┬──────────────────┬──────────────────┬─────────────┘
             │                  │                  │
             │                  │                  │
             ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                      APPLICATION SERVER                         │
│                    (Your Computer / VPS)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    PM2 Process Manager                    │  │
│  │              (24/7 Operation & Auto-Restart)              │  │
│  └────────────────────────┬─────────────────────────────────┘  │
│                           │                                     │
│  ┌────────────────────────▼─────────────────────────────────┐  │
│  │                   Node.js Application                     │  │
│  │                      (src/app.js)                         │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │                                                           │  │
│  │  ┌─────────────────┐         ┌──────────────────┐       │  │
│  │  │  Telegram Bot   │         │   Express API    │       │  │
│  │  │   (Bot API)     │         │  (REST Routes)   │       │  │
│  │  └────────┬────────┘         └────────┬─────────┘       │  │
│  │           │                           │                  │  │
│  │           └───────────┬───────────────┘                  │  │
│  │                       │                                  │  │
│  │           ┌───────────▼────────────┐                     │  │
│  │           │   Business Logic       │                     │  │
│  │           │   (Handlers/Services)  │                     │  │
│  │           └───────────┬────────────┘                     │  │
│  │                       │                                  │  │
│  │           ┌───────────▼────────────┐                     │  │
│  │           │   Database Factory     │                     │  │
│  │           │  (models/index.js)     │                     │  │
│  │           └───────────┬────────────┘                     │  │
│  │                       │                                  │  │
│  │          ┌────────────┴────────────┐                     │  │
│  │          │                         │                     │  │
│  │          ▼                         ▼                     │  │
│  │  ┌──────────────┐         ┌──────────────┐             │  │
│  │  │ JSON Files   │         │   MongoDB    │             │  │
│  │  │ (simpleDB)   │         │  (Mongoose)  │             │  │
│  │  └──────────────┘         └──────────────┘             │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Winston Logger                         │  │
│  │              (logs/error.log, combined.log)               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE STORAGE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Option 1: JSON Files (data/)                                  │
│  ├── branches.json                                             │
│  ├── users.json                                                │
│  └── transactions.json                                         │
│                                                                 │
│  Option 2: MongoDB                                             │
│  ├── Local: mongodb://localhost:27017/bakong-bot              │
│  └── Cloud: mongodb+srv://cluster.mongodb.net/bakong-bot      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Details

### 1. Client Layer

**Telegram Clients**
- Staff use Telegram app on phones/tablets
- Commands: /start, /branch, /record, /daily, /report
- Real-time interaction with bot

**Web/API Clients**
- Browsers for viewing data
- API clients (curl, Postman) for testing
- Other applications can integrate via REST API

### 2. Application Server

**PM2 Process Manager**
- Keeps bot running 24/7
- Auto-restart on crash
- Log management
- Resource monitoring
- Optional daily restart

**Node.js Application**
- Main entry point: `src/app.js`
- Express server for HTTP/API
- Telegram Bot API integration
- Business logic and handlers

**Telegram Bot Component**
- Handles Telegram commands
- Processes user messages
- Sends responses and notifications
- Uses node-telegram-bot-api library

**Express API Component**
- REST endpoints for data access
- CORS enabled for cross-origin requests
- Rate limiting for security
- Helmet.js for HTTP security headers

**Business Logic**
- Command handlers (handlers/)
- Services (services/)
- Utilities (utils/)

**Database Factory**
- Abstraction layer for database access
- Supports both JSON and MongoDB
- Switchable via environment variable
- Consistent interface for both types

### 3. Database Layer

**JSON Files (Development)**
- Simple file-based storage
- No setup required
- Good for single-device testing
- Files in data/ directory

**MongoDB (Production)**
- Scalable NoSQL database
- Supports concurrent access
- Required for multi-device
- Can be local or cloud (Atlas)

### 4. Logging System

**Winston Logger**
- Structured logging
- Multiple log levels (error, warn, info, debug)
- Separate error and combined logs
- Log rotation (5MB max per file)
- Console output with colors

---

## Data Flow

### Recording a Payment (Telegram)

```
1. User sends message to Telegram bot
   "25000 Fried rice"
   
2. Telegram API → Bot receives message
   
3. Bot → paymentHandler.js
   Parses amount and description
   
4. Handler → Database Factory
   Creates transaction record
   
5. Database Factory → JSON or MongoDB
   Saves transaction
   
6. Database → Handler
   Returns saved transaction
   
7. Handler → Bot
   Formats success message
   
8. Bot → Telegram API
   Sends confirmation to user
   
9. Logger → Log files
   Records transaction event
```

### Viewing Data (API)

```
1. Client sends HTTP request
   GET http://server:3000/api/transactions
   
2. Express → Rate Limiter
   Checks request limit
   
3. Rate Limiter → API Router
   Forwards request
   
4. API Router → Database Factory
   Queries transactions
   
5. Database Factory → JSON or MongoDB
   Retrieves data
   
6. Database → API Router
   Returns transaction list
   
7. API Router → Express
   Formats JSON response
   
8. Express → Client
   Sends HTTP response
   
9. Logger → Log files
   Records API access
```

---

## Deployment Architectures

### Architecture 1: Local Development

```
┌─────────────────┐
│  Your Computer  │
├─────────────────┤
│  Node.js App    │
│  JSON Database  │
│  Port: 3000     │
└─────────────────┘
        │
        ▼
   localhost:3000
```

**Use Case:** Quick testing, development
**Database:** JSON files
**Access:** localhost only

---

### Architecture 2: Local Network (Multi-Device)

```
┌─────────────────────────────────────┐
│         WiFi Network                │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────┐                  │
│  │ Main Computer│                  │
│  │ (Server)     │                  │
│  │ MongoDB      │                  │
│  │ Node.js App  │                  │
│  │ 192.168.1.100│                  │
│  └──────┬───────┘                  │
│         │                           │
│    ┌────┴────┬────────┬────────┐   │
│    │         │        │        │   │
│    ▼         ▼        ▼        ▼   │
│  Phone A  Phone B  Tablet  Computer│
│                                     │
└─────────────────────────────────────┘
```

**Use Case:** Team testing in same office
**Database:** MongoDB local or Atlas
**Access:** 192.168.1.100:3000

---

### Architecture 3: Cloud Deployment (Production)

```
┌─────────────────────────────────────────┐
│            Internet                     │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│      Cloud Server (VPS)                 │
│      your-server.com                    │
├─────────────────────────────────────────┤
│  PM2 → Node.js App                      │
│  Port: 3000                             │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│      MongoDB Atlas (Cloud)              │
│      cluster.mongodb.net                │
└─────────────────────────────────────────┘
             │
        ┌────┴────┬────────┬────────┐
        │         │        │        │
        ▼         ▼        ▼        ▼
    Phone A   Phone B  Tablet  Computer
  (Anywhere) (Anywhere)
```

**Use Case:** Production, 24/7 operation
**Database:** MongoDB Atlas
**Access:** From anywhere via internet

---

### Architecture 4: Docker Deployment

```
┌─────────────────────────────────────────┐
│         Docker Host                     │
├─────────────────────────────────────────┤
│                                         │
│  ┌────────────────────────────────┐    │
│  │  Docker Network (bakong-net)   │    │
│  ├────────────────────────────────┤    │
│  │                                │    │
│  │  ┌──────────────────────────┐ │    │
│  │  │  Container: bakong-bot   │ │    │
│  │  │  Node.js App             │ │    │
│  │  │  Port: 3000              │ │    │
│  │  └──────────┬───────────────┘ │    │
│  │             │                  │    │
│  │  ┌──────────▼───────────────┐ │    │
│  │  │  Container: mongodb      │ │    │
│  │  │  MongoDB Database        │ │    │
│  │  │  Port: 27017             │ │    │
│  │  └──────────────────────────┘ │    │
│  │                                │    │
│  └────────────────────────────────┘    │
│                                         │
└─────────────────────────────────────────┘
```

**Use Case:** Easy deployment, isolated environment
**Database:** MongoDB in container
**Access:** localhost:3000 or server IP

---

## Security Architecture

```
┌─────────────────────────────────────────┐
│           Client Request                │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│      Security Middleware                │
├─────────────────────────────────────────┤
│  1. Helmet.js                           │
│     - Security headers                  │
│     - XSS protection                    │
│     - Content security policy           │
│                                         │
│  2. CORS                                │
│     - Cross-origin control              │
│     - Allowed origins                   │
│                                         │
│  3. Rate Limiter                        │
│     - 100 requests / 15 minutes         │
│     - Per IP address                    │
│                                         │
│  4. Input Validation                    │
│     - Sanitize user input               │
│     - Validate data types               │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│      Application Logic                  │
└─────────────────────────────────────────┘
```

---

## Monitoring & Logging Architecture

```
┌─────────────────────────────────────────┐
│         Application Events              │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│       Winston Logger                    │
├─────────────────────────────────────────┤
│  Log Levels:                            │
│  - error   (critical issues)            │
│  - warn    (warnings)                   │
│  - info    (general info)               │
│  - debug   (detailed debug)             │
└────────────┬────────────────────────────┘
             │
        ┌────┴────┬────────┐
        │         │        │
        ▼         ▼        ▼
┌──────────┐ ┌─────────┐ ┌──────────┐
│ Console  │ │ Error   │ │ Combined │
│ Output   │ │ Log     │ │ Log      │
│ (Colors) │ │ File    │ │ File     │
└──────────┘ └─────────┘ └──────────┘
                   │
                   ▼
           ┌───────────────┐
           │  PM2 Logs     │
           │  - pm2-out    │
           │  - pm2-error  │
           └───────────────┘
```

---

## Technology Stack

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Bot Library:** node-telegram-bot-api
- **Database:** MongoDB (Mongoose) or JSON files
- **Process Manager:** PM2
- **Logger:** Winston

### Security
- **Helmet.js** - HTTP security headers
- **CORS** - Cross-origin resource sharing
- **express-rate-limit** - Rate limiting

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **PM2** - Process management

### Utilities
- **dotenv** - Environment variables
- **axios** - HTTP client
- **qrcode** - QR code generation
- **moment-timezone** - Date/time handling

---

## Scalability Considerations

### Current Architecture (v2.0)
- ✅ Supports multiple concurrent users
- ✅ Horizontal scaling ready (stateless)
- ✅ Database connection pooling
- ✅ Efficient data queries with indexes

### Future Enhancements
- Load balancer for multiple instances
- Redis for caching
- Message queue (RabbitMQ/Redis)
- Microservices architecture
- WebSocket for real-time updates

---

## Performance Optimization

### Database Indexes
```javascript
// MongoDB indexes for fast queries
branchSchema.index({ name: 1 });
userSchema.index({ telegramId: 1 });
transactionSchema.index({ branchId: 1, createdAt: -1 });
```

### Connection Pooling
- MongoDB maintains connection pool
- Reuses connections for efficiency
- Configurable pool size

### Caching Strategy
- In-memory caching for branches
- Query result caching (future)
- Static asset caching

---

**Made with ❤️ by SkyNova Tech Company**
