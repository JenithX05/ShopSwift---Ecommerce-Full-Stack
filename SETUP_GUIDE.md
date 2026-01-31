# BlinkIt Clone - Complete Setup Guide

This guide will walk you through setting up and making this full-stack e-commerce application functional.

## Project Structure

- **Client**: React + Vite frontend (located in `/client`)
- **Server**: Node.js + Express backend (located in `/server`)

## Prerequisites

Before starting, ensure you have:
- Node.js (v16 or higher) installed
- MongoDB database (local or cloud like MongoDB Atlas)
- Git installed
- A code editor (VS Code recommended)

## Step 1: Install Dependencies

### Install Server Dependencies

```bash
cd BlinkIt-Clone-Full-Stack-Ecommerce/server
npm install
```

### Install Client Dependencies

```bash
cd BlinkIt-Clone-Full-Stack-Ecommerce/client
npm install
```

## Step 2: Set Up Environment Variables

### Server Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/blinkit-clone
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blinkit-clone?retryWrites=true&w=majority

# Server Configuration
PORT=8080
FRONTEND_URL=http://localhost:5173

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-token-key-change-this-in-production

# Email Service (Resend API)
# Get your API key from https://resend.com/api-keys
RESEND_API=re_your_resend_api_key_here

# Stripe Payment Gateway
# Get your keys from https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Cloudinary (for image uploads)
# Get credentials from https://cloudinary.com/console
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Client Environment Variables

Create a `.env` file in the `client` directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:8080

# Stripe Publishable Key (same as server)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

## Step 3: Set Up MongoDB Database

### Option A: Local MongoDB

1. Install MongoDB locally from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/blinkit-clone`

### Option B: MongoDB Atlas (Cloud - Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Create a database user
5. Whitelist your IP address (or use 0.0.0.0/0 for development)
6. Get your connection string and update `MONGODB_URI` in `.env`

## Step 4: Set Up Third-Party Services

### Resend (Email Service)

1. Sign up at https://resend.com
2. Verify your domain or use the default domain for testing
3. Go to API Keys section
4. Create a new API key
5. Add it to `RESEND_API` in server `.env`

### Stripe (Payment Gateway)

1. Sign up at https://stripe.com
2. Go to Developers > API Keys
3. Copy your **Test** keys (for development)
4. Add `STRIPE_SECRET_KEY` to server `.env`
5. Add `STRIPE_PUBLISHABLE_KEY` to both server and client `.env`

### Cloudinary (Image Storage)

1. Sign up at https://cloudinary.com
2. Go to Dashboard
3. Copy your:
   - Cloud Name
   - API Key
   - API Secret
4. Add them to server `.env`

## Step 5: Start the Application

### Terminal 1 - Start the Server

```bash
cd BlinkIt-Clone-Full-Stack-Ecommerce/server
npm run dev
```

The server should start on `http://localhost:8080`

### Terminal 2 - Start the Client

```bash
cd BlinkIt-Clone-Full-Stack-Ecommerce/client
npm run dev
```

The client should start on `http://localhost:5173`

## Step 6: Verify Installation

1. **Check Server**: Open `http://localhost:8080` in browser
   - Should see: `{"message":"Server is running 8080"}`

2. **Check Client**: Open `http://localhost:5173` in browser
   - Should see the BlinkIt clone homepage

3. **Check Database Connection**: 
   - Look at server terminal for "connect DB" message
   - If you see connection errors, verify your `MONGODB_URI`

## Common Issues and Solutions

### Issue 1: MongoDB Connection Error

**Error**: `Mongodb connect error`

**Solution**:
- Verify MongoDB is running (if local)
- Check `MONGODB_URI` in `.env` is correct
- For Atlas: Ensure IP is whitelisted and credentials are correct

### Issue 2: CORS Error

**Error**: `Access to fetch at 'http://localhost:8080' from origin 'http://localhost:5173' has been blocked by CORS`

**Solution**:
- Ensure `FRONTEND_URL` in server `.env` matches your client URL
- Default should be `http://localhost:5173`

### Issue 3: Environment Variables Not Loading

**Error**: Variables are `undefined`

**Solution**:
- Ensure `.env` files are in the correct directories (`server/.env` and `client/.env`)
- Restart the server/client after creating `.env` files
- Check for typos in variable names

### Issue 4: Module Not Found Errors

**Error**: `Cannot find module 'xyz'`

**Solution**:
- Run `npm install` in the respective directory (server or client)
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

### Issue 5: Port Already in Use

**Error**: `Port 8080 is already in use`

**Solution**:
- Change `PORT` in server `.env` to a different port (e.g., 8081)
- Update `VITE_API_URL` in client `.env` to match

## Testing the Application

### 1. User Registration
- Navigate to signup page
- Create a new account
- Check if email verification works (if implemented)

### 2. User Login
- Login with registered credentials
- Verify JWT tokens are being set

### 3. Product Management (Admin)
- Login as admin
- Add categories
- Add products
- Upload product images

### 4. Shopping Features
- Browse products
- Add items to cart
- Proceed to checkout
- Test payment (use Stripe test cards)

## Production Deployment

### Server Deployment (Vercel)

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Client Deployment (Vercel/Netlify)

1. Build the client: `npm run build`
2. Deploy the `dist` folder
3. Update `VITE_API_URL` to production server URL

### Important Production Notes

- Change all test API keys to production keys
- Use strong, unique JWT secrets
- Set proper CORS origins
- Use MongoDB Atlas production cluster
- Enable HTTPS
- Set up proper error logging

## API Endpoints Overview

The application includes the following main API routes:

- `/api/user/*` - User authentication and management
- `/api/category/*` - Category management
- `/api/subcategory/*` - Subcategory management
- `/api/product/*` - Product management
- `/api/cart/*` - Shopping cart operations
- `/api/address/*` - Address management
- `/api/order/*` - Order processing
- `/api/file/*` - File/image uploads

## Security Checklist

- [ ] Change default JWT secrets
- [ ] Use environment variables for all sensitive data
- [ ] Enable HTTPS in production
- [ ] Set up proper CORS policies
- [ ] Validate all user inputs
- [ ] Use rate limiting
- [ ] Secure MongoDB connection
- [ ] Keep dependencies updated

## Next Steps

1. Set up all environment variables
2. Install dependencies
3. Start both server and client
4. Test basic functionality
5. Customize as needed

## Support

If you encounter issues:
1. Check the console/terminal for error messages
2. Verify all environment variables are set correctly
3. Ensure all services (MongoDB, Stripe, etc.) are properly configured
4. Check that ports are not in use by other applications

---

**Note**: This is a development setup. For production, additional security measures and optimizations are required.
