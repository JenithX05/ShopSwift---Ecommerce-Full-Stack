import mongoose from 'mongoose';
import CategoryModel from '../models/category.model.js';
import ProductModel from '../models/product.model.js';
import dotenv from 'dotenv';

dotenv.config();

// Placeholder image URLs for common categories
const categoryImageMap = {
    'fruits': 'https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=Fruits',
    'vegetables': 'https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=Vegetables',
    'dairy': 'https://via.placeholder.com/150x150/2196F3/FFFFFF?text=Dairy',
    'bakery': 'https://via.placeholder.com/150x150/FF9800/FFFFFF?text=Bakery',
    'meat': 'https://via.placeholder.com/150x150/F44336/FFFFFF?text=Meat',
    'beverages': 'https://via.placeholder.com/150x150/00BCD4/FFFFFF?text=Beverages',
    'snacks': 'https://via.placeholder.com/150x150/E91E63/FFFFFF?text=Snacks',
    'personal care': 'https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=Personal+Care',
    'home care': 'https://via.placeholder.com/150x150/607D8B/FFFFFF?text=Home+Care',
    'baby care': 'https://via.placeholder.com/150x150/FFC107/000000?text=Baby+Care'
};

// Generic placeholder for any category
const genericCategoryImage = 'https://via.placeholder.com/150x150/CCCCCC/FFFFFF?text=Category';

// Generic product placeholder
const genericProductImage = 'https://via.placeholder.com/150x150/FF5722/FFFFFF?text=Product';

const seedImages = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Update categories without images
        const categoriesWithoutImages = await CategoryModel.find({
            $or: [
                { image: '' },
                { image: null },
                { image: { $exists: false } }
            ]
        });

        console.log(`Found ${categoriesWithoutImages.length} categories without images`);

        for (const category of categoriesWithoutImages) {
            const categoryName = category.name.toLowerCase();
            let imageUrl = categoryImageMap[categoryName] || genericCategoryImage;
            
            await CategoryModel.findByIdAndUpdate(
                category._id,
                { image: imageUrl }
            );
            
            console.log(`Updated category: ${category.name} with image`);
        }

        // Update products without images
        const productsWithoutImages = await ProductModel.find({
            $or: [
                { image: [] },
                { image: { $size: 0 } },
                { image: null },
                { image: { $exists: false } }
            ]
        });

        console.log(`Found ${productsWithoutImages.length} products without images`);

        for (const product of productsWithoutImages) {
            await ProductModel.findByIdAndUpdate(
                product._id,
                { image: [genericProductImage] }
            );
            
            console.log(`Updated product: ${product.name} with image`);
        }

        // Update products with empty image arrays
        const productsWithEmptyImages = await ProductModel.find({
            image: { $size: 0 }
        });

        for (const product of productsWithEmptyImages) {
            await ProductModel.findByIdAndUpdate(
                product._id,
                { image: [genericProductImage] }
            );
            
            console.log(`Updated product with empty array: ${product.name}`);
        }

        console.log('✅ Image seeding completed successfully');
        
    } catch (error) {
        console.error('❌ Error seeding images:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

// Run the seed function
seedImages();
