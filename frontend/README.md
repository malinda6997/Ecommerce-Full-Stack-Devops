# MobileShop - E-Commerce Frontend

A modern, minimalistic e-commerce website for selling mobile phones built with React, Vite, Tailwind CSS, and shadcn/ui.

## 🚀 Features

- **Modern UI/UX**: Minimalistic design with black and white color scheme
- **Fully Responsive**: Mobile-first design, works perfectly on all devices
- **Product Catalog**: Browse all phones with filtering and sorting options
- **Product Details**: Detailed product pages with specifications and color selection
- **Shopping Cart**: Add, remove, and manage products in cart
- **Checkout**: Complete checkout flow with order confirmation
- **Category Filtering**: Filter by category, brand, and sort by price/name
- **Featured Products**: Showcase highlighted products
- **Persistent Cart**: Cart data saved in localStorage

## 📦 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **React Router DOM** - Navigation
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons
- **Context API** - State management

## 🛠️ Installation & Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies (already done):

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open your browser and visit:

```
http://localhost:5173
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx       # Navigation header
│   │   │   └── Footer.jsx       # Footer component
│   │   └── ui/                  # shadcn/ui components
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       ├── badge.jsx
│   │       └── input.jsx
│   ├── context/
│   │   └── CartContext.jsx      # Shopping cart state management
│   ├── data/
│   │   └── products.js          # Dummy product data
│   ├── lib/
│   │   └── utils.js             # Utility functions
│   ├── pages/
│   │   ├── HomePage.jsx         # Landing page
│   │   ├── CategoryPage.jsx    # Product listing with filters
│   │   ├── ProductPage.jsx     # Product details
│   │   ├── CartPage.jsx        # Shopping cart
│   │   ├── CheckoutPage.jsx    # Checkout form
│   │   └── OrderConfirmationPage.jsx
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── jsconfig.json
```

## 🎨 Design Features

- **Color Scheme**: Pure black (#000000) and white (#FFFFFF)
- **Typography**: Clean, modern sans-serif fonts
- **Responsive Grid**: Adapts to mobile, tablet, and desktop
- **Smooth Transitions**: Hover effects and animations
- **Accessibility**: Proper contrast ratios and semantic HTML

## 📱 Pages

1. **Home Page** (`/`)

   - Hero section
   - Category grid
   - Featured products
   - Why choose us section

2. **Category Page** (`/categories`)

   - Product grid with filters
   - Filter by category and brand
   - Sort by price and name
   - Mobile-friendly filter sidebar

3. **Product Page** (`/product/:id`)

   - Product image and details
   - Color selection
   - Quantity selector
   - Add to cart / Buy now
   - Full specifications
   - Related products

4. **Cart Page** (`/cart`)

   - Cart items list
   - Quantity management
   - Remove items
   - Order summary
   - Proceed to checkout

5. **Checkout Page** (`/checkout`)

   - Shipping information form
   - Payment information form
   - Order summary
   - Place order

6. **Order Confirmation** (`/order-confirmation`)
   - Order number
   - Order total
   - Success message

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📊 Dummy Data

The project includes 10 dummy products with:

- Flagship phones (iPhone, Samsung, Google Pixel, etc.)
- Mid-range devices
- Multiple brands
- Realistic pricing
- High-quality images from Unsplash
- Detailed specifications

## 🎯 Future Enhancements (Backend Integration)

When you're ready to add the backend:

- User authentication
- Real product database
- Payment gateway integration
- Order history
- Product reviews
- Wishlist functionality
- Search functionality
- Admin panel

## 📝 Notes

- All images are loaded from Unsplash
- Cart data persists in localStorage
- No backend required for frontend testing
- Fully functional shopping flow
- Mobile-optimized for all screen sizes

## 🎉 Ready to Use!

Your e-commerce frontend is complete and ready to use. Simply run `npm run dev` and start exploring the application.
