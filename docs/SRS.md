# Software Requirements Specification (SRS)

**Project Name:** Bakong Vendor Bot - KHQR Payment Tracking System  
**Date:** May 23, 2026  
**Document Version:** v1.0  
**Team:** SkyNova Tech Company  
**Project Code:** DUC2026-PGB

---

## 1. Target User Personas

This section defines the core user groups identified during the discovery phase.

### 1.1 Persona: Branch Staff (Vendor)

* **Description:** Front-line employees who handle daily sales transactions and record payments at various branch locations.
* **Key Attributes:** 
  - Mobile-first users (primarily using Telegram on smartphones)
  - Need quick, simple payment recording
  - Limited technical expertise
  - Work in fast-paced retail/food service environment
  - Need real-time transaction confirmation

* **Interview Cohort:**
  * **User A:** Street food vendor staff at Central Market - handles 50-100 daily transactions
  * **User B:** Retail shop cashier at Russian Market - processes mixed cash and QR payments
  * **User C:** Mobile vendor at Olympic Market - needs offline-capable solution

### 1.2 Persona: Business Owner/Manager

* **Description:** Franchise owners or managers who oversee multiple branches and need consolidated reporting.
* **Key Attributes:**
  - Requires real-time visibility across all branches
  - Data-driven decision making
  - Needs reconciliation tools
  - Values accuracy and fraud prevention
  - Mobile and desktop access

* **Interview Cohort:**
  * **User A:** Multi-branch street food franchise owner - manages 5 locations
  * **User B:** Retail chain manager - oversees 3 shops with 10+ staff
  * **User C:** Restaurant owner - tracks daily sales and inventory

### 1.3 Persona: Administrator

* **Description:** System administrators who manage user access, branch configuration, and system settings.
* **Key Attributes:**
  - Technical proficiency
  - Manages user permissions
  - Configures branches and settings
  - Monitors system health

---

## 2. User Interview Insights & Pain Points

*Derived from raw interview data collected on May 23, 2026.*

### 2.1 Branch Staff Insights

* **User A (Street Food Vendor):** 
  > "We used to share payment screenshots in group chat. It was chaos - messages get lost, hard to count at end of day. Need something simple that works on my phone."
  
  **Pain Points:**
  - Manual screenshot sharing is disorganized
  - Difficult to track which payments were recorded
  - End-of-day reconciliation takes 1-2 hours
  - No way to categorize payment methods (cash vs QR)

* **User B (Retail Cashier):**
  > "Sometimes customers pay in dollars, sometimes riel. I have to calculate conversion manually and write it down. Often make mistakes."
  
  **Pain Points:**
  - Manual currency conversion is error-prone
  - No standardized format for recording transactions
  - Cannot easily search past transactions
  - Branch assignment is unclear

* **User C (Mobile Vendor):**
  > "Internet is not always stable at my location. Need to record payments even when offline, then sync later."
  
  **Pain Points:**
  - Requires offline capability
  - Need simple interface for quick entry
  - Want photo proof of QR payments
  - Need confirmation that payment was recorded

### 2.2 Business Owner/Manager Insights

* **User A (Franchise Owner):**
  > "I need to see sales from all my branches in real-time. Currently, staff send me Excel files at end of day - too slow and often has errors."
  
  **Pain Points:**
  - No real-time visibility across branches
  - Manual data aggregation is time-consuming
  - Cannot identify top-performing branches quickly
  - Difficult to detect fraud or errors

* **User B (Chain Manager):**
  > "Reconciliation is a nightmare. Staff forget to record payments, or record same payment twice. Need automatic verification."
  
  **Pain Points:**
  - Duplicate payment entries
  - Missing transactions
  - No audit trail
  - Cannot verify KHQR payments automatically

* **User C (Restaurant Owner):**
  > "I want daily, weekly, monthly reports automatically. Also need to export data for accounting software."
  
  **Pain Points:**
  - Manual report generation
  - No data export functionality
  - Cannot compare performance across time periods
  - Need both KHR and USD reporting

---

## 3. Functional Feature Summary

This section translates user needs into high-level features, structured by user role.

### 3.1 Branch Staff Features

| Feature ID | Feature Name | Description | Priority |
|------------|--------------|-------------|----------|
| **REQ-S01** | User Registration | As a Staff member, I want to register with my name and phone number so that my transactions are tracked to my account. | High |
| **REQ-S02** | Branch Selection | As a Staff member, I want to select my branch once so that all my transactions are automatically tagged to the correct location. | High |
| **REQ-S03** | Quick Payment Entry | As a Staff member, I want to record a payment by typing "AMOUNT DESCRIPTION" so that I can quickly log transactions during busy periods. | High |
| **REQ-S04** | Currency Symbol Support | As a Staff member, I want to use ៛ or $ symbols in payment amounts so that the system automatically detects the currency. | High |
| **REQ-S05** | Payment Method Selection | As a Staff member, I want to choose between QR Payment and Cash Payment so that payment types are properly categorized. | High |
| **REQ-S06** | Photo Upload | As a Staff member, I want to upload KHQR payment screenshots so that I have proof of digital transactions. | Medium |
| **REQ-S07** | Payment Confirmation | As a Staff member, I want to see a confirmation receipt after recording a payment so that I know it was saved successfully. | High |
| **REQ-S08** | Dual Currency Display | As a Staff member, I want to see amounts in both KHR and USD so that I can verify conversions are correct. | Medium |
| **REQ-S09** | Daily Summary | As a Staff member, I want to view my daily sales summary so that I can reconcile my cash drawer at end of shift. | High |
| **REQ-S10** | Transaction History | As a Staff member, I want to view my past transactions so that I can verify previous entries. | Medium |

### 3.2 Business Owner/Manager Features

| Feature ID | Feature Name | Description | Priority |
|------------|--------------|-------------|----------|
| **REQ-M01** | Real-time Dashboard | As a Manager, I want to see real-time sales across all branches so that I can monitor business performance. | High |
| **REQ-M02** | Daily Reports | As a Manager, I want to generate daily sales reports so that I can review end-of-day performance. | High |
| **REQ-M03** | Weekly Analytics | As a Manager, I want to view weekly sales trends so that I can identify patterns and plan inventory. | Medium |
| **REQ-M04** | Monthly Reports | As a Manager, I want to generate monthly reports so that I can prepare financial statements. | Medium |
| **REQ-M05** | Branch Comparison | As a Manager, I want to compare sales across branches so that I can identify top performers. | High |
| **REQ-M06** | Payment Method Analytics | As a Manager, I want to see breakdown by payment method (Cash vs QR) so that I can understand customer preferences. | Medium |
| **REQ-M07** | Staff Performance | As a Manager, I want to see transactions by staff member so that I can track individual performance. | Low |
| **REQ-M08** | Data Export | As a Manager, I want to export transaction data to CSV/Excel so that I can import into accounting software. | Medium |
| **REQ-M09** | Multi-device Access | As a Manager, I want to access reports from any device so that I can monitor business remotely. | High |
| **REQ-M10** | Transaction Verification | As a Manager, I want to verify KHQR payments against Bakong API so that I can prevent fraud. | Low |

### 3.3 Administrator Features

| Feature ID | Feature Name | Description | Priority |
|------------|--------------|-------------|----------|
| **REQ-A01** | Branch Management | As an Admin, I want to add/edit/delete branches so that I can manage business locations. | High |
| **REQ-A02** | User Management | As an Admin, I want to manage user accounts and permissions so that I can control system access. | High |
| **REQ-A03** | System Configuration | As an Admin, I want to configure system settings (currency rates, business info) so that the system reflects current business rules. | Medium |
| **REQ-A04** | Audit Logs | As an Admin, I want to view system audit logs so that I can track all system activities. | Low |
| **REQ-A05** | Backup & Restore | As an Admin, I want to backup and restore data so that business data is protected. | Medium |

### 3.4 System Features

| Feature ID | Feature Name | Description | Priority |
|------------|--------------|-------------|----------|
| **REQ-SYS01** | 24/7 Availability | The system shall run continuously without manual intervention so that users can access it anytime. | High |
| **REQ-SYS02** | Auto-restart on Failure | The system shall automatically restart if it crashes so that downtime is minimized. | High |
| **REQ-SYS03** | Multi-device Support | The system shall support access from multiple devices simultaneously so that all staff can use it concurrently. | High |
| **REQ-SYS04** | Centralized Database | The system shall use a centralized database so that all devices see the same data in real-time. | High |
| **REQ-SYS05** | Duplicate Prevention | The system shall prevent duplicate message processing so that users don't see repeated responses. | High |
| **REQ-SYS06** | Error Handling | The system shall handle errors gracefully and provide user-friendly error messages. | High |
| **REQ-SYS07** | Logging | The system shall log all activities for debugging and audit purposes. | Medium |
| **REQ-SYS08** | API Access | The system shall provide REST API endpoints so that external systems can integrate. | Medium |

---

## 4. Non-Functional Requirements

### 4.1 Performance Requirements

| Requirement ID | Description | Target Metric |
|----------------|-------------|---------------|
| **NFR-P01** | Response Time | Bot shall respond to commands within 2 seconds under normal load |
| **NFR-P02** | Concurrent Users | System shall support at least 50 concurrent users |
| **NFR-P03** | Transaction Throughput | System shall handle at least 1000 transactions per day |
| **NFR-P04** | Database Query Time | Database queries shall complete within 500ms |

### 4.2 Security Requirements

| Requirement ID | Description |
|----------------|-------------|
| **NFR-S01** | User Authentication | All users must register with name and phone number |
| **NFR-S02** | Data Encryption | Sensitive data shall be encrypted in transit (HTTPS) |
| **NFR-S03** | Access Control | Users can only access data for their assigned branch |
| **NFR-S04** | Admin Privileges | Only administrators can manage branches and users |
| **NFR-S05** | Audit Trail | All transactions shall be logged with user ID and timestamp |

### 4.3 Reliability Requirements

| Requirement ID | Description |
|----------------|-------------|
| **NFR-R01** | Uptime | System shall maintain 99% uptime (excluding planned maintenance) |
| **NFR-R02** | Data Backup | Transaction data shall be backed up daily |
| **NFR-R03** | Fault Tolerance | System shall auto-restart on failure within 30 seconds |
| **NFR-R04** | Data Integrity | No transaction data shall be lost due to system failure |

### 4.4 Usability Requirements

| Requirement ID | Description |
|----------------|-------------|
| **NFR-U01** | Learning Curve | New users shall be able to record their first payment within 5 minutes |
| **NFR-U02** | Language Support | System shall support English and Khmer languages |
| **NFR-U03** | Mobile-First | Interface shall be optimized for mobile devices (Telegram) |
| **NFR-U04** | Error Messages | Error messages shall be clear and actionable |

### 4.5 Scalability Requirements

| Requirement ID | Description |
|----------------|-------------|
| **NFR-SC01** | Branch Scaling | System shall support up to 100 branches |
| **NFR-SC02** | User Scaling | System shall support up to 500 users |
| **NFR-SC03** | Transaction Volume | System shall handle up to 10,000 transactions per day |
| **NFR-SC04** | Database Growth | System shall handle database growth up to 1GB |

---

## 5. Technical Architecture

### 5.1 System Components

```
┌─────────────────────────────────────────┐
│         Telegram Bot API                │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│      Node.js Application (Express)      │
│  - Bot Handlers                         │
│  - Business Logic                       │
│  - API Routes                           │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│      Database Layer (Factory)           │
│  - JSON Files (Development)             │
│  - MongoDB (Production)                 │
└─────────────────────────────────────────┘
```

### 5.2 Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Runtime | Node.js | 18+ |
| Framework | Express.js | 4.18+ |
| Bot Library | node-telegram-bot-api | 0.64+ |
| Database (Dev) | JSON Files | - |
| Database (Prod) | MongoDB | 7+ |
| Process Manager | PM2 | 5.3+ |
| Logger | Winston | 3.11+ |
| Containerization | Docker | Optional |

### 5.3 Database Schema

**Users Collection:**
```javascript
{
  id: Number,
  telegramId: Number (unique),
  username: String,
  firstName: String,
  lastName: String,
  fullName: String,
  phoneNumber: String,
  currentBranchId: Number,
  isAdmin: Boolean,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

**Branches Collection:**
```javascript
{
  id: Number,
  name: String,
  location: String,
  isActive: Boolean,
  contactNumber: String,
  address: String,
  createdAt: Date
}
```

**Transactions Collection:**
```javascript
{
  id: Number,
  branchId: Number,
  userId: Number,
  amount: Number,
  currency: String (KHR/USD),
  description: String,
  paymentMethod: String (CASH/KHQR/CARD/BANK_TRANSFER),
  verificationStatus: String (pending/verified/rejected),
  transactionReference: String,
  photoUrl: String,
  notes: String,
  createdAt: Date
}
```

---

## 6. User Stories & Acceptance Criteria

### 6.1 High Priority User Stories

**Story 1: Quick Payment Recording**
```
As a branch staff member
I want to record a payment by typing "25000 Fried rice"
So that I can quickly log transactions during busy periods

Acceptance Criteria:
- User can type amount and description in one message
- System detects currency (KHR default, or $ for USD)
- System shows confirmation with both KHR and USD amounts
- Payment is saved to database within 2 seconds
- User receives transaction ID for reference
```

**Story 2: Branch Selection**
```
As a branch staff member
I want to select my branch once at the start
So that all my transactions are automatically tagged correctly

Acceptance Criteria:
- User can select branch from list via /branch command
- Selection is remembered for future transactions
- User can change branch anytime
- System shows current branch in payment confirmations
```

**Story 3: Daily Sales Summary**
```
As a branch staff member
I want to view my daily sales summary
So that I can reconcile my cash drawer at end of shift

Acceptance Criteria:
- User can view summary via /daily command
- Summary shows total sales in KHR and USD
- Summary shows number of transactions
- Summary shows breakdown by payment method
- Summary shows only current day's transactions
```

---

## 7. API Endpoints

### 7.1 Public API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/health` | Health check | No |
| GET | `/api/branches` | List all branches | No |
| GET | `/api/branches/:id` | Get branch by ID | No |
| GET | `/api/transactions` | List transactions (with filters) | No |
| POST | `/api/transactions` | Create transaction | No |
| GET | `/api/reports/daily` | Daily sales report | No |
| GET | `/api/stats` | System statistics | No |

### 7.2 API Request/Response Examples

**Create Transaction:**
```http
POST /api/transactions
Content-Type: application/json

{
  "branchId": 1,
  "amount": 25000,
  "description": "Fried rice",
  "paymentMethod": "KHQR",
  "currency": "KHR"
}

Response:
{
  "success": true,
  "data": {
    "id": 123,
    "branchId": 1,
    "amount": 25000,
    "currency": "KHR",
    "description": "Fried rice",
    "paymentMethod": "KHQR",
    "createdAt": "2026-05-23T10:30:00.000Z"
  }
}
```

---

## 8. Testing Requirements

### 8.1 Unit Testing
- All utility functions (currency conversion, phone validation)
- Database operations (CRUD)
- State management functions

### 8.2 Integration Testing
- Bot command handlers
- API endpoints
- Database connections
- Payment flow (end-to-end)

### 8.3 User Acceptance Testing
- Registration flow
- Payment recording
- Report generation
- Multi-device access

---

## 9. Deployment Requirements

### 9.1 Development Environment
- Local machine with Node.js
- JSON file database
- Manual start/stop

### 9.2 Production Environment
- Cloud server (VPS) or local server
- MongoDB database (local or Atlas)
- PM2 process manager
- 24/7 operation
- Auto-restart on failure
- Daily backup

### 9.3 Deployment Checklist
- [ ] Configure environment variables (.env)
- [ ] Set up MongoDB database
- [ ] Install PM2 globally
- [ ] Start bot with PM2
- [ ] Configure PM2 auto-startup
- [ ] Set up daily backups
- [ ] Configure firewall (port 3000)
- [ ] Test from multiple devices
- [ ] Monitor logs for errors

---

## 10. Next Steps & Traceability

### 10.1 Completed Features ✅
- [x] User registration with state machine (REQ-S01)
- [x] Branch selection (REQ-S02)
- [x] Quick payment entry (REQ-S03)
- [x] Currency symbol support (REQ-S04)
- [x] Payment method selection (REQ-S05)
- [x] Payment confirmation (REQ-S07)
- [x] Dual currency display (REQ-S08)
- [x] Daily summary (REQ-S09)
- [x] 24/7 availability (REQ-SYS01)
- [x] Auto-restart (REQ-SYS02)
- [x] Multi-device support (REQ-SYS03)
- [x] Centralized database (REQ-SYS04)
- [x] Duplicate prevention (REQ-SYS05)
- [x] REST API (REQ-SYS08)

### 10.2 Pending Features 📋
- [ ] Photo upload for KHQR (REQ-S06)
- [ ] Transaction history view (REQ-S10)
- [ ] Weekly analytics (REQ-M03)
- [ ] Monthly reports (REQ-M04)
- [ ] Branch comparison (REQ-M05)
- [ ] Payment method analytics (REQ-M06)
- [ ] Data export (REQ-M08)
- [ ] Admin panel (REQ-A01, REQ-A02)
- [ ] Bakong API integration (REQ-M10)

### 10.3 Immediate Next Steps
1. [ ] Create UI/UX wireframes for admin panel
2. [ ] Implement photo upload feature (REQ-S06)
3. [ ] Add transaction history view (REQ-S10)
4. [ ] Implement weekly/monthly reports (REQ-M03, REQ-M04)
5. [ ] Add data export functionality (REQ-M08)
6. [ ] Conduct user acceptance testing with real vendors
7. [ ] Deploy to production server
8. [ ] Create user training materials

### 10.4 Future Enhancements
- Real-time notifications via WebSocket
- Mobile app (React Native)
- Advanced analytics dashboard
- Multi-language support (full Khmer translation)
- Automated backups to cloud storage
- Role-based access control
- Export to accounting software (QuickBooks, Xero)
- Inventory management integration

---

## 11. Glossary

| Term | Definition |
|------|------------|
| KHQR | Khmer QR - Cambodia's national QR code payment standard |
| Bakong | Cambodia's national payment system operated by NBC |
| KHR | Cambodian Riel (៛) |
| USD | United States Dollar ($) |
| Branch | Physical business location (store, stall, restaurant) |
| Transaction | A single payment record |
| PM2 | Process Manager 2 - Node.js process manager |
| REST API | Representational State Transfer Application Programming Interface |

---

## 12. Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Project Manager | [Name] | | |
| Technical Lead | [Name] | | |
| Business Owner | [Name] | | |
| QA Lead | [Name] | | |

---

**Document Control:**
- **Created:** May 23, 2026
- **Last Updated:** May 23, 2026
- **Next Review:** June 23, 2026
- **Status:** Draft
- **Classification:** Internal Use

---

*End of Software Requirements Specification*
