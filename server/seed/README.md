# Database Seeding Scripts

This folder contains scripts to help populate your database with default data and fix missing images.

## Available Scripts

### 1. seedCategories.js
- Adds default categories if none exist
- Updates categories without images with appropriate placeholder images
- Categories include: Fruits & Vegetables, Dairy & Breakfast, Bakery & Biscuits, etc.

### 2. seedImages.js
- Updates categories without images with placeholder images
- Updates products without images with placeholder images
- Uses Cloudinary URLs for placeholders

## How to Use

### Method 1: Using npm scripts (Recommended)

```bash
# Seed categories only
npm run seed:categories

# Seed images only  
npm run seed:images

# Seed both categories and images
npm run seed:all
```

### Method 2: Direct execution

```bash
# Navigate to server directory
cd server

# Run categories seed
node seed/seedCategories.js

# Run images seed
node seed/seedImages.js
```

## What the scripts do

### Categories Script:
1. Checks if categories exist in database
2. If no categories exist, adds 10 default categories
3. Updates any categories without images with appropriate placeholders

### Images Script:
1. Finds all categories without images
2. Updates them with Cloudinary placeholder URLs
3. Finds all products without images
4. Updates them with generic product placeholder

## Before Running

1. Make sure your `.env` file is configured with:
   - `MONGODB_URI` - Your MongoDB connection string
   - `CLOUDINARY_*` - Your Cloudinary credentials (for image URLs)

2. Make sure your MongoDB server is running

## After Running

- Your home page should display categories with proper images
- Products should have fallback images if they were missing any
- No more broken image icons on the website

## Troubleshooting

If images still don't load:
1. Check your Cloudinary configuration
2. Verify the image URLs are accessible
3. Check browser console for any CORS issues
4. Make sure the client-side image fallbacks are working

## Customization

You can modify the `defaultCategories` array in `seedCategories.js` to add your own categories and images.
You can also update the `categoryImageMap` in `seedImages.js` to use different placeholder images.
