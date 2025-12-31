# Frontend - Mini User Management System

## Project Overview

The frontend for the Mini User Management System provides a responsive web interface for user authentication, profile management, and admin dashboards. It consumes the backend API to manage users securely and provides a clean user experience using React and Tailwind CSS.

### Key Features

* Login and signup with client-side validation
* Role-based dashboards (Admin/User)
* User profile management (edit profile, change password)
* Request admin access feature
* Admin dashboard: list users, activate/deactivate accounts, pagination
* Protected routes based on authentication and user roles
* Responsive UI for desktop and mobile
* Success/error notifications using toast messages

## Tech Stack

* **React** (Hooks) for UI development
* **Tailwind CSS** for styling
* **Axios** for API calls
* **React Router v6** for routing
* **React Hot Roast** for notifications/toasts
* **Vite** as the build tool

## Environment Variables

Create a `.env` file in the frontend directory:

```
VITE_API_URL=http://localhost:5000/api
```

> Replace the URL with the deployed backend API URL in production.

## Setup Instructions

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Run locally:

```bash
npm run dev
```

3. The frontend will be available at `http://localhost:5173` (Vite default)

## Deployment

* Can be deployed on **Vercel**, **Netlify**, or any static hosting platform.
* Ensure the environment variable `VITE_API_URL` is set to the deployed backend API URL.

## Features

* **Login Page:** Email & password fields, client-side validation, redirect on success, error display, link to signup
* **Signup Page:** Full name, email, password, confirm password, client-side validation, server-side error display, redirect on success
* **User Profile Page:** View/edit profile, change password, request admin access
* **Admin Dashboard:** View all users with pagination, activate/deactivate users, confirmation dialogs, toast notifications
* **Navigation Bar:** Displays user name, role, role-based links, logout button
* **Protected Routes:** Prevent unauthorized access, admin-only pages

## Response Handling

* All API responses are handled using a unified format:

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
  "error": "Detailed error (optional for debugging/logs)"
}
```

## Testing

* Manual testing using the UI is recommended.
* Toast notifications show real-time success/failure messages.

---
