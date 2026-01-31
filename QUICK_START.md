# Quick Start Checklist

Follow these steps in order to get your BlinkIt Clone running:

## ✅ Step-by-Step Checklist

### 1. Install Dependencies
- [ ] `cd server && npm install`
- [ ] `cd client && npm install`

### 2. Create Environment Files

**Server `.env` file** (create in `server/` directory):
```env
MONGODB_URI=mongodb://localhost:27017/blinkit-clone
PORT=8080
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-random-secret-key-here
JWT_REFRESH_SECRET=your-random-refresh-secret-here
RESEND_API=your_resend_api_key
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Client `.env` file** (create in `client/` directory):
```env
VITE_API_URL=http://localhost:8080
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
```

### 3. Set Up Services

- [ ] **MongoDB**: Install locally OR create MongoDB Atlas account
- [ ] **Resend**: Sign up at resend.com and get API key
- [ ] **Stripe**: Sign up at stripe.com and get test API keys
- [ ] **Cloudinary**: Sign up at cloudinary.com and get credentials

### 4. Start the Application

**Terminal 1 - Server:**
```bash
cd server
npm run dev
```
Expected output: `Server is running 8080` and `connect DB`

**Terminal 2 - Client:**
```bash
cd client
npm run dev
```
Expected output: Local server URL (usually http://localhost:5173)

### 5. Verify It Works

- [ ] Open http://localhost:8080 - Should see server message
- [ ] Open http://localhost:5173 - Should see the app
- [ ] Try registering a new user
- [ ] Check server terminal for any errors

## 🚨 Common First-Time Issues

1. **"MONGODB_URI not found"** → Create `server/.env` file
2. **"Cannot find module"** → Run `npm install` in that directory
3. **Port already in use** → Change PORT in `.env` or kill the process using that port
4. **CORS errors** → Make sure `FRONTEND_URL` matches your client URL

## 📝 Minimum Required Setup

To get started quickly, you only need:
- ✅ MongoDB connection (can use local MongoDB)
- ✅ Server `.env` with `MONGODB_URI`, `PORT`, `FRONTEND_URL`, `JWT_SECRET`, `JWT_REFRESH_SECRET`
- ✅ Client `.env` with `VITE_API_URL`

Other services (Stripe, Resend, Cloudinary) can be added later as you test those features.

## 🎯 What to Do Next

1. Complete the checklist above
2. Read the full `SETUP_GUIDE.md` for detailed explanations
3. Test user registration and login
4. Add products and test the shopping flow

---

**Need help?** Check `SETUP_GUIDE.md` for detailed instructions and troubleshooting.
