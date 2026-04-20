# Role-Based eCommerce Admin Dashboard

A secure admin panel for a basic eCommerce backend using Node.js, Express, AdminJS, Sequelize, and PostgreSQL.

This project is built without Bootstrap. Styling for custom UI parts should use plain CSS (or Tailwind if added later).

## Assignment Goals Covered

- Node.js + Express backend
- Sequelize ORM + PostgreSQL
- AdminJS integration for admin interface
- bcrypt password hashing
- JWT-based authentication
- Role-based access control (Admin vs Regular User)
- Custom pages in AdminJS:
  - Dashboard
  - Settings

## Tech Stack

- Backend: Node.js, Express
- ORM: Sequelize
- Database: PostgreSQL
- Admin Panel: AdminJS
- Auth: bcrypt, jsonwebtoken
- Environment: dotenv

## Project Structure (Planned)

```txt
.
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── adminjs.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── category.model.js
│   │   ├── product.model.js
│   │   ├── order.model.js
│   │   ├── orderItem.model.js
│   │   └── setting.model.js
│   ├── routes/
│   │   └── auth.routes.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── role.middleware.js
│   ├── controllers/
│   │   └── auth.controller.js
│   ├── utils/
│   │   ├── jwt.js
│   │   └── hash.js
│   └── app.js
├── seeders/
├── migrations/
├── .env.example
├── package.json
├── README.md
└── PROJECT_PLAN.md
```

## Core Features

### 1) Authentication

- `POST /api/login` with email + password
- Password compare using bcrypt
- JWT token generation after successful login
- AdminJS access protected by authentication

### 2) Database Models

- User
- Category
- Product
- Order
- OrderItem
- Setting

### 3) AdminJS Resources

- Register all required models in AdminJS
- Hide password field in all views/actions
- Configure relations for better readability

### 4) Role-Based Access

- **Admin**:
  - Full access to Users, Products, Categories, Orders, OrderItems, Settings
  - Can create/update/delete users and other entities
  - Sees full dashboard summary

- **Regular User**:
  - Can log in
  - Cannot see Users or Settings resources
  - Sees limited dashboard information

### 5) Custom Pages

- **Dashboard page**:
  - Admin: totals (users, products, orders, revenue)
  - Regular user: limited personal/summary view

- **Settings page**:
  - Admin can view and update key-value settings
  - Hidden/inaccessible for regular users

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce_admin
DB_USER=postgres
DB_PASSWORD=postgres

JWT_SECRET=change_this_secret
JWT_EXPIRES_IN=1d

COOKIE_SECRET=change_this_cookie_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

## Setup Commands

```bash
npm install
npm run migrate
npm run seed
npm run dev
```

Example scripts (to include in `package.json`):

```json
{
  "scripts": {
    "dev": "nodemon src/app.js",
    "start": "node src/app.js",
    "migrate": "sequelize-cli db:migrate",
    "seed": "sequelize-cli db:seed:all"
  }
}
```

## API

### Login

- Method: `POST`
- Endpoint: `/api/login`
- Request body:

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

- Success response:

```json
{
  "message": "Login successful",
  "token": "<jwt_token>",
  "user": {
    "id": 1,
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

## Branch Strategy (GitHub)

- `main`: stable, review-ready code
- `dev`: integration branch
- feature branches:
  - `feature/project-setup`
  - `feature/models-relations`
  - `feature/auth-jwt`
  - `feature/adminjs-rbac`
  - `feature/custom-pages`

Suggested flow:

1. Create feature branch from `dev`
2. Commit focused changes
3. Open PR to `dev`
4. Merge tested changes
5. Merge `dev` to `main` when assignment is complete

## Submission Checklist

- Public GitHub repository URL
- Clear commit history
- Working setup instructions in README
- `.env.example` included
- Role-based access demonstrated
- Dashboard + Settings custom pages completed

## No-Bootstrap Note

This assignment does not require Bootstrap. Any custom UI in AdminJS component pages can use:

- Plain CSS modules
- Styled components
- Tailwind CSS (optional)

No Bootstrap dependency is needed.
