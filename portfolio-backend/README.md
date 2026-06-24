# Hariharan Portfolio — Backend

Node.js + Express + MySQL backend for the portfolio contact form.

---

## Project Structure

```
portfolio-backend/
├── server.js           ← Entry point
├── db.js               ← MySQL connection
├── schema.sql          ← Run this once in MySQL to create the table
├── .env.example        ← Copy to .env and fill your values
├── package.json
├── script.js           ← Updated frontend script (copy to your portfolio folder)
├── routes/
│   ├── contact.js      ← POST /contact
│   └── admin.js        ← GET /admin/messages, DELETE /admin/messages/:id
└── middleware/
    ├── validate.js     ← Input validation
    └── auth.js         ← Admin API key check
```

---

## Setup Steps

### 1. Install dependencies
```bash
npm install
```

### 2. Set up the database
Open MySQL and run:
```bash
mysql -u root -p < schema.sql
```

### 3. Configure environment
```bash
cp .env.example .env
```
Edit `.env` with your MySQL password and a strong `ADMIN_KEY`.

### 4. Start the server
```bash
# Development (auto-restart on changes)
npm run dev

# Production
npm start
```

Server runs at: `http://localhost:3000`

---

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/` | Health check |
| POST | `/contact` | Submit contact form |
| GET | `/admin/messages` | View all messages (requires `x-admin-key` header) |
| DELETE | `/admin/messages/:id` | Delete a message (requires `x-admin-key` header) |

### POST /contact — Request Body
```json
{
  "Name": "John Doe",
  "Email": "john@example.com",
  "Mobile": "9876543210",
  "Subject": "Project Inquiry",
  "Message": "Hello Hariharan, I'd like to discuss a project."
}
```

### GET /admin/messages — View all submissions
```bash
curl http://localhost:3000/admin/messages \
  -H "x-admin-key: your_admin_key_here"
```

---

## Frontend Update

Replace the old `script.js` in your portfolio with the new `script.js` included here. It connects the contact form to the backend automatically.

When deploying to production, change the fetch URL in `script.js` from:
```
http://localhost:3000/contact
```
to your hosted server URL, e.g.:
```
https://api.yourdomain.com/contact
```
