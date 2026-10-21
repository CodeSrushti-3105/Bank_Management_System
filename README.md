# Bank Management System

A simple CRUD application with user authentication built with Node.js, Express, and MongoDB.

## Features
- User Registration & Login
- JWT Authentication
- User-specific data (each user sees only their own records)
- CRUD operations (Create, Read, Update, Delete)
- Search functionality

## Prerequisites
- Node.js installed
- MongoDB Atlas account (or local MongoDB)

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd employee-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   
   Create a `.env` file in the root directory:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

4. **Run the application**
   ```bash
   node server.js
   ```

5. **Open in browser**
   ```
   http://localhost:5000/register.html
   ```

## Usage

1. Register a new user
2. Login with your credentials
3. Add, view, edit, and delete bank accounts
4. Each user can only see their own data

## Project Structure

```
├── models/
│   ├── Record.js       # Bank account schema
│   └── User.js         # User authentication schema
├── public/
│   ├── index.html      # Main dashboard
│   ├── login.html      # Login page
│   ├── register.html   # Registration page
│   ├── script.js       # Main app logic
│   ├── auth.js         # Authentication logic
│   └── style.css       # Styles
├── server.js           # Express server & API routes
├── .env                # Environment variables (not in repo)
├── .gitignore          # Git ignore file
└── package.json        # Dependencies

```

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user

### Records (Protected - requires token)
- `GET /api/records` - Get all user's records
- `POST /api/records` - Create new record
- `PUT /api/records/:id` - Update record
- `DELETE /api/records/:id` - Delete record

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens), bcryptjs
- **Frontend:** HTML, CSS, JavaScript

## Notes
- Passwords are hashed using bcrypt for security
- JWT tokens are stored in localStorage
- Each user can only access their own data
