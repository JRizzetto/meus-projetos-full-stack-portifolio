# 🚀 TaskFlow — Task Manager SaaS

A modern Full Stack task management application built to simulate a real-world SaaS product.

TaskFlow allows users to securely register, authenticate and manage their own tasks through a clean and responsive interface.

This project was developed as part of my journey transitioning into software development, focusing on modern architecture, authentication flows, database modeling and scalable Full Stack practices.

---

# ✨ Features

## 🔐 Authentication
- User registration with validation
- Secure login with hashed passwords
- Session management with NextAuth
- Protected routes

## 📋 Task Management (CRUD)
- Create tasks
- View tasks by authenticated user
- Update task details and status
- Delete tasks

## 🧠 Architecture
- Full Stack application using Next.js App Router
- API Route Handlers for backend logic
- Prisma ORM for database access
- Authentication handled with NextAuth
- Relational database modeling with PostgreSQL

---

# 🔄 Application Flow

```txt
User Registration
↓
Data Validation (Zod)
↓
Password Hashing (bcryptjs)
↓
Authentication with NextAuth
↓
Protected Dashboard Access
↓
Task CRUD Operations
```

---

# 🛠️ Tech Stack

## Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend
- Next.js Route Handlers
- Prisma ORM
- PostgreSQL (Neon)
- NextAuth
- Zod
- bcryptjs

## Deployment
- Vercel
- Neon Database

---

# 📂 Project Structure

```txt
src/
 ├── app/
 ├── components/
 ├── lib/
 ├── generated/
 └── prisma/
```

---

# 📖 Documentation

This project includes additional planning and architecture documentation:

- `project-map.md`
- `system-flow.md`
- `project-spec.md`

---

# 🎯 Purpose

This project demonstrates:

- Full Stack development skills
- Authentication flow implementation
- Database modeling and relationships
- API design and validation
- Modern Next.js architecture
- Scalable project organization
- Responsive SaaS UI development

---

# 🚧 Future Improvements

- Improved UI/UX
- Advanced task filters
- Search functionality
- Better loading states
- Dashboard analytics
- Mobile experience refinements

---

# 🌐 Live Demo

👉 https://SEU-LINK-VERCEL.vercel.app

---

# 👨‍💻 Author

Developed by Jefferson Rizzetto.

- GitHub: https://github.com/JRizzetto
- LinkedIn: https://www.linkedin.com/in/jefferson-rizzetto/
