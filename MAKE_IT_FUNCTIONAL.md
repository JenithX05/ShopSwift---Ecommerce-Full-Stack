# How to Make Your BlinkIt Clone Functional

## 📋 Overview

This is a full-stack e-commerce application (BlinkIt clone) with:
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB
- **Features**: User auth, product management, shopping cart, payments (Stripe), image uploads (Cloudinary), email (Resend)

## 🔧 What Needs to Be Done

### 1. **Install Dependencies** (Required)

```bash
# Install server dependencies
cd BlinkIt-Clone-Full-Stack-Ecommerce/server
npm install

# Install client dependencies  
cd ../client
npm install
```

### 2. **Set Up Environment Variables** (Required)

#### Server Environment File
Create `server/.env` file with:

```env
# Database (REQUIRED)
MONGODB_URI=mongodb://localhost:27017/blinkit-clone

# Server Config (REQUIRED)
PORT=8080
FRONTEND_URL=http://localhost:5173

# Authentication (REQUIRED)
JWT_SECRET=any-random-string-here-make-it-long-and-secure
JWT_REFRESH_SECRET=another-random-string-here-make-it-long-and-secure

# Email Service (OPTIONAL - for password reset/verification)
RESEND_API=re_your_api_key_here

# Payment Gateway (OPTIONAL - for checkout)
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here

# Image Upload (OPTIONAL - for product images)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Client Environment File
Create `client/.env` file with:

```env
# Backend URL (REQUIRED)
VITE_API_URL=http://localhost:8080

# Stripe (OPTIONAL - only if using payments)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

### 3. **Set Up MongoDB** (Required)

**Option A: Local MongoDB**
1. Download and install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Use: `mongodb://localhost:27017/blinkit-clone`

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Create database user
5. Whitelist IP (0.0.0.0/0 for development)
6. Copy connection string to `MONGODB_URI`

### 4. **Set Up Optional Services**

#### Resend (Email) - For password reset
1. Sign up: https://resend.com
2. Get API key from dashboard
3. Add to `RESEND_API` in server `.env`

#### Stripe (Payments) - For checkout
1. Sign up: https://stripe.com
2. Go to Developers > API Keys
3. Copy **Test** keys
4. Add to both server and client `.env`

#### Cloudinary (Images) - For product images
1. Sign up: https://cloudinary.com
2. Get credentials from dashboard
3. Add to server `.env`

### 5. **Start the Application**

**Terminal 1 - Start Server:**
```bash
cd BlinkIt-Clone-Full-Stack-Ecommerce/server
npm run dev
```

**Terminal 2 - Start Client:**
```bash
cd BlinkIt-Clone-Full-Stack-Ecommerce/client
npm run dev
```

### 6. **Verify It's Working**

1. **Server**: Open http://localhost:8080
   - Should see: `{"message":"Server is running 8080"}`
   - Check terminal for: `connect DB` message

2. **Client**: Open http://localhost:5173
   - Should see the application homepage

## 🐛 Issues Fixed

I've already fixed one bug in the code:
- ✅ Fixed Cloudinary environment variable names (was `CLODINARY`, now `CLOUDINARY`)

## ⚠️ Common Problems & Solutions

### Problem: "MONGODB_URI not found"
**Solution**: Create `server/.env` file with `MONGODB_URI` variable

### Problem: "Cannot find module"
**Solution**: Run `npm install` in the directory showing the error

### Problem: Port already in use
**Solution**: 
- Change `PORT` in server `.env` to different number (e.g., 8081)
- Update `VITE_API_URL` in client `.env` to match

### Problem: CORS errors
**Solution**: 
- Ensure `FRONTEND_URL` in server `.env` matches your client URL
- Default should be `http://localhost:5173`

### Problem: Database connection fails
**Solution**:
- Verify MongoDB is running (if local)
- Check connection string is correct
- For Atlas: Verify IP is whitelisted and credentials are correct

## 📝 Minimum Setup (To Get Started)

You can start with just these:

1. ✅ Install dependencies (`npm install` in both folders)
2. ✅ Create `server/.env` with:
   - `MONGODB_URI`
   - `PORT`
   - `FRONTEND_URL`
   - `JWT_SECRET`
   - `JWT_REFRESH_SECRET`
3. ✅ Create `client/.env` with:
   - `VITE_API_URL`
4. ✅ Set up MongoDB (local or Atlas)
5. ✅ Start both server and client

**Optional services** (Stripe, Resend, Cloudinary) can be added later when you need those features.

## 🎯 Testing Checklist

Once running, test these features:

- [ ] User registration
- [ ] User login
- [ ] View products
- [ ] Add to cart
- [ ] Checkout (if Stripe configured)
- [ ] Admin: Add categories
- [ ] Admin: Add products
- [ ] Upload images (if Cloudinary configured)

## 📚 Additional Resources

- **Detailed Setup**: See `SETUP_GUIDE.md`
- **Quick Start**: See `QUICK_START.md`

## 🔐 Security Notes

- Never commit `.env` files to git
- Use strong, random JWT secrets in production
- Use production API keys (not test keys) in production
- Enable HTTPS in production
- Set proper CORS origins for production

## 🚀 Next Steps

1. Follow the setup steps above
2. Test basic functionality
3. Add optional services as needed
4. Customize the application
5. Deploy to production when ready

---

**Need help?** Check the error messages in your terminal/console - they usually tell you exactly what's missing!
