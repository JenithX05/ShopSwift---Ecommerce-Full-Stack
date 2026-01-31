# ShopSwift - Ecommerce Full Stack
A complete e-commerce platform similar to Blinkit built with MERN stack! 

Build a complete e-commerce platform that looks like Blinkit using the MERN stack! In this project, we will create an online shopping site with key features, including product uploads, an admin panel, and management for categories and subcategories. We will use access and refresh tokens to establish secure user authentication. You will also learn how to set up password recovery, OTP-based email verification, and secure authentication processes. This project is a great way to improve your skills in MongoDB, Express, React, and Node.js.

## Features

- 🛍️ **Product Management**: Add, edit, and delete products
- 📱 **Responsive Design**: Mobile-friendly interface
- 🔐 **Secure Authentication**: JWT-based auth with refresh tokens
- 💳 **Stripe Payments**: Complete payment integration
- 🔍 **Advanced Search**: Regex-based product search
- 📍 **Address Management**: Multiple delivery addresses
- 📦 **Order Tracking**: Complete order history and status
- 🎨 **Modern UI**: Beautiful, intuitive user interface

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Redux
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (Access & Refresh Tokens)
- **Payments**: Stripe
- **Image Storage**: Cloudinary
- **Development**: Nodemon, Git

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/JenithX05/ShopSwift---Ecommerce-Full-Stack.git
   cd ShopSwift---Ecommerce-Full-Stack
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Server environment variables
   cd server
   cp .env.example .env
   # Update .env with your credentials

   # Client environment variables
   cd ../client
   cp .env.example .env
   # Update .env with your API URL
   ```

4. **Database Setup**
   ```bash
   # Seed the database with sample data
   cd server
   npm run seed:all
   ```

5. **Start the application**
   ```bash
   # Start server (port 8083)
   cd server
   npm run dev

   # Start client (port 5173)
   cd ../client
   npm run dev
   ```

## Quick Start

For detailed setup instructions, check out:
- [MAKE_IT_FUNCTIONAL.md](./MAKE_IT_FUNCTIONAL.md)
- [QUICK_START.md](./QUICK_START.md)
- [SETUP_GUIDE.md](./SETUP_GUIDE.md)

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Browse Products**: Explore categories and search for products
3. **Add to Cart**: Select products and add them to your cart
4. **Checkout**: Select delivery address and choose payment method
5. **Payment**: Complete payment via Stripe or Cash on Delivery
6. **Track Orders**: View order history and track delivery status

## Project Structure

```
ShopSwift---Ecommerce-Full-Stack/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions
│   │   └── provider/      # Context providers
│   └── package.json
├── server/                # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── seed/             # Database seeders
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

 <a href="https://github.com/JenithX05" target="_blank">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="JenithX05"/>
 </a>

 Developed with ❤️ by JenithX05