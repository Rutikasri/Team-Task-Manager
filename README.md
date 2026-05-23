# Team Task Manager

Team Task Manager is a full-stack MERN web application developed to manage projects, assign tasks, and track team progress efficiently using Role-Based Access Control (RBAC). The application allows Admin users to create and manage projects/tasks while Members can access and update only their assigned work.

The system includes secure JWT authentication, MongoDB Atlas database integration, protected APIs, and a modern responsive user interface built using React and Tailwind CSS.

---

# Features

## Authentication & Authorization
- User Signup and Login
- JWT Authentication
- Protected Routes
- Role-Based Access Control (Admin / Member)

---

# Admin Features
- Create Projects
- Edit Projects
- Delete Projects
- Assign Team Members
- Create Tasks
- Assign Tasks to Members
- Edit Tasks
- Delete Tasks
- Track Team Progress

---

# Member Features
- Secure Login
- View Assigned Projects
- View Assigned Tasks
- Update Task Status
  - TODO
  - IN_PROGRESS
  - COMPLETED

---

# Dashboard Features
- Total Projects Count
- Total Tasks Count
- Completed Tasks
- Pending Tasks
- Overdue Tasks
- Dynamic Real-Time Data

---

# Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

---

# Database
MongoDB Atlas is used as the cloud database for storing:
- Users
- Projects
- Tasks
- Team Assignments

---

# Role-Based Access Control

## Admin
- Full Access
- Manage Projects
- Manage Tasks
- Assign Members
- Delete Records

## Member
- Limited Access
- Can View Only Assigned Projects
- Can View Only Assigned Tasks
- Can Update Task Status

---

# API Functionalities

## Authentication APIs
- Signup
- Login
- Get Users

## Project APIs
- Create Project
- Get Projects
- Update Project
- Delete Project

## Task APIs
- Create Task
- Get Tasks
- Update Task Status
- Delete Task

---

# Security Features
- Password Hashing using bcryptjs
- JWT Token Authentication
- Protected Backend Routes
- Secure Role Validation
- Environment Variables using `.env`

---

# UI Features
- Clean Modern Dashboard
- Responsive Layout
- Sidebar Navigation
- Toast Notifications
- Smooth Hover Effects
- Dynamic Data Rendering

---

# Installation & Setup

## Clone Repository

```bash
git clone <repository-url>

# Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# Admin Credentials

```txt
Email: admin@taskflow.com
Password: admin123
```

---

# Future Improvements
- Search & Filters
- Charts & Analytics
- File Uploads
- Email Notifications
- Mobile Optimization
- Dark/Light Theme
- Activity Logs

---

# Learning Outcomes
Through this project:
- Implemented full-stack MERN architecture
- Learned JWT authentication
- Built role-based access systems
- Managed MongoDB relationships
- Created protected APIs
- Designed responsive frontend UI
- Understood CRUD workflows
- Integrated cloud database deployment

---

# Conclusion

Team Task Manager is a complete MERN stack application that demonstrates practical implementation of authentication, authorization, CRUD operations, project management, and task tracking in a real-world workflow environment.
