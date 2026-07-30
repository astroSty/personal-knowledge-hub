# 📚 Personal Knowledge Hub

A production-style Personal Knowledge Hub built with **NestJS**, **PostgreSQL**, and **Prisma ORM**. The application allows users to securely manage personal notes with authentication, search, pagination, sorting, and interactive API documentation.

## 🚀 Features

* 🔐 JWT Authentication
* 👤 User Registration & Login
* 📝 Create, Read, Update & Delete Notes
* 🔒 Protected Routes & User Authorization
* 🔍 Search Notes by Title or Content
* 📄 Pagination
* ↕️ Sorting
* ✅ Request Validation using DTOs
* 🛡️ Global Exception Handling
* 📘 Swagger API Documentation

## 🛠️ Tech Stack

### Backend

* NestJS
* TypeScript
* Prisma ORM
* PostgreSQL

### Authentication

* JWT (JSON Web Tokens)
* bcrypt

### Validation & Documentation

* class-validator
* class-transformer
* Swagger (OpenAPI)

## 📂 Project Structure

```
personal-knowledge-hub/
├── backend/
├── frontend/
├── docs/
└── README.md
```

## ▶️ Running the Backend

```bash
cd backend
npm install
npm run start:dev
```

The backend runs on:

```
http://localhost:3001
```

Swagger API documentation:

```
http://localhost:3001/api
```

## 📌 Current Progress

### ✅ Phase 1

* User Authentication
* JWT Authorization
* Notes CRUD
* Prisma & PostgreSQL Integration

### ✅ Phase 2

* Search
* Pagination
* Sorting
* Query Validation
* Global Exception Handling
* Swagger API Documentation

## 🎯 Upcoming

Phase 3 will focus on advanced features to make the application more production-ready, including better note organization, enhanced user experience, and additional backend capabilities.
