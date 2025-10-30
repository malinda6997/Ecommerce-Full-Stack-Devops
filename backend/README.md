# E-commerce Backend API

Node.js backend for the E-commerce Full Stack Application with MongoDB.

## Features

- RESTful API architecture
- MongoDB database integration
- JWT authentication
- Role-based access control (User & Admin)
- CORS enabled for frontend and admin panel
- Environment variable configuration

## Technologies

- Node.js
- Express.js
- MongoDB (Native Driver)
- JWT (JSON Web Tokens)
- bcryptjs for password hashing

## Installation

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

   - Copy `.env` file and update the values as needed
   - MongoDB URI is already configured

3. Start the server:

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)

### Products

- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Categories

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Orders

- `POST /api/orders` - Create order
- `GET /api/orders` - Get all orders (Admin)
- `GET /api/orders/my-orders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get single order (Protected)
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Users

- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get user by ID (Admin)
- `PUT /api/users/:id` - Update user (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)

## Environment Variables

```
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
DB_NAME=ecommerce_db
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

## Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Database Collections

- **users** - User accounts and authentication
- **products** - Product catalog
- **categories** - Product categories
- **orders** - Customer orders

## Default Admin Credentials

For initial setup, you can create an admin user by registering with role 'admin':

```json
{
  "name": "Admin",
  "email": "admin@phone4n.com",
  "password": "admin123",
  "role": "admin"
}
```
