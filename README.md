# Shopify Product Management Frontend

Frontend application for a MERN + Shopify product management system.

This application allows admins to:

- View Shopify products
- View complete product details
- Update product prices
- View previous 5 price changes
- Manage products through a clean admin dashboard UI

---

# Tech Stack

- React.js
- Vite
- Tailwind CSS v4
- React Router DOM
- Axios
- React Toastify

---

# Features

- Product listing page
- Product details page
- Product image display
- Product variant management
- Update Shopify product prices
- Display price history
- Toast notifications
- Responsive UI

---

# Environment Variables

Create a `.env` file in the root directory.

```env
VITE_API_URL=http://localhost:5000/api
```

---

# Installation

## Clone Repository

```bash
git clone <your-repository-url>
```

---

## Install Dependencies

```bash
npm install
```

---

# Start Development Server

```bash
npm run dev
```

Frontend will run on:

```txt
http://localhost:5173
```

---

# Application Pages

## Products Page

Displays:

- Product image
- Product title
- Product description
- Product type
- Current price

---

## Product Details Page

Displays:

- Product image
- Vendor
- Product type
- Product status
- Product tags
- Product description
- Product variants
- Current prices
- Previous 5 price history

Allows:

- Updating product variant prices

---

# API Integration

The frontend connects with backend APIs:

```http
GET /api/products

GET /api/products/:productId

PUT /api/products/:variantId

GET /api/products/history/:productId
```

---

# Notifications

React Toastify is used for:

- Success messages
- Error handling
- User feedback

---

# Future Improvements

- Search functionality
- Pagination
- Skeleton loaders
- Authentication
- Dark mode
- Debounced API calls
- Redux Toolkit / Zustand
- Performance optimization

---

# Author

Varsha