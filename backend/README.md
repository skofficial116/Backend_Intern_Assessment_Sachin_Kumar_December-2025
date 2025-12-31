# Backend - Mini User Management System

## Project Overview

The backend for the Mini User Management System provides a RESTful API for user authentication, role-based access control, and user lifecycle management. It allows users to register, login, manage their profile, and request admin access, while admins can view all users, activate/deactivate accounts, and manage roles securely.

### Key Features

* User signup and login with JWT-based cookie authentication
* Password hashing using bcrypt
* Role-based access control (Admin/User)
* User profile management (view, edit, change password)
* Admin functions: list users, activate/deactivate accounts
* Request admin access via a secret codeword
* Input validation for all endpoints
* Consistent success/failure response format

## Tech Stack

* **Node.js** + **Express** for server-side logic
* **MongoDB (Atlas)** for database
* **bcrypt** for password hashing
* **JWT** for authentication (cookie-based)
* **express-validator** for input validation
* **CORS** for secure cross-origin requests

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
PORT=5000
MONGO_URI=<Your MongoDB Atlas URI>
JWT_SECRET=<Your JWT Secret>
CLIENT_URL=http://localhost:3000
ADMIN_CODEWORD=<Secret codeword to grant admin access>
NODE_ENV=development
```

> **Note:** Do not commit `.env` to GitHub. It contains sensitive credentials.

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Start the server locally:

```bash
npm run dev
```

3. The API will be available at `http://localhost:5000`

## API Documentation

* Postman Collection link: Will be available soon.
* Key endpoints:

**Authentication**

* `POST /api/auth/signup` — Create a new user
* `POST /api/auth/login` — Login existing user
* `POST /api/auth/logout` — Logout user
* `GET /api/auth/me` — Get current logged-in user

**User Management**

* `GET /api/users` — List all users (admin only)
* `PATCH /api/users/:id/activate` — Activate user account (admin only)
* `PATCH /api/users/:id/deactivate` — Deactivate user account (admin only)
* `PUT /api/users/profile` — Update logged-in user profile
* `PUT /api/users/change-password` — Change logged-in user password
* `POST /api/users/request-admin` — Request admin access

## Response Format

All responses follow a unified structure:

**Success:**

```json
{
  "success": true,
  "message": "Action completed successfully",
  "data": {...}
}
```

**Failure:**

```json
{
  "success": false,
  "message": "Descriptive error message",
  "error": "Detailed error (for logs/debugging)"
}
```

## Testing

* Run backend tests (unit/integration) using:

```bash
npm run test
```

## Deployment

* The backend can be deployed on **Render**.

