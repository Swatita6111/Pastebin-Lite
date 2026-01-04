# Pastebin-Lite

A minimal Pastebin-like application that allows users to create text pastes and share a URL to view them. Pastes can optionally expire based on time (TTL) or view count.

# 🚀 How to Run Locally
Prerequisites

Node.js (v18+ recommended)

Redis (local or cloud)

# Backend Setup
cd server
npm install
npm start


The server will start on:

http://localhost:3001

# Frontend Setup
cd client
npm install
npm run dev


The UI will be available at:

http://localhost:5173

Make sure the frontend API base URL points to the backend server.

#  Persistence Layer

Redis is used as the persistence layer.
Each paste is stored as a Redis key (paste:<id>) with a JSON value.
Redis was chosen because:
Fast read/write performance
Simple key-value access
Suitable for ephemeral data like expiring pastes

# 🧠 Important Design Decisions

UUIDs are used for paste IDs to avoid collisions.

View limits are enforced by incrementing a view counter on each successful fetch.

TTL expiry is handled by storing an absolute expiration timestamp.

Deterministic testing support:

When TEST_MODE=1 is enabled, the x-test-now-ms request header is used as the current time for expiry checks.

Security:

Paste content is rendered safely in HTML to prevent script execution.

Clear separation of concerns:

API routes handle JSON responses

/p/:id route serves HTML for viewing pastes

# ✅ Supported Features

Create a paste with optional TTL and view limits
Share a public URL to view the paste
Automatic expiration based on time or views
Health check endpoint for service validation

# 📡 API Endpoints

GET /api/healthz
POST /api/pastes
GET /api/pastes/:id
GET /p/:id