import mongoose from 'mongoose';
import CategoryModel from '../models/category.model.js';
import ProductModel from '../models/product.model.js';
import dotenv from 'dotenv';

dotenv.config();

// Working placeholder images
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
    'baby care': 'https://via.placeholder.com/150x150/FFC107/000000?text=Baby+Care',
    'grocery': 'https://via.placeholder.com/150x150/8BC34A/FFFFFF?text=Grocery',
    'food': 'https://via.placeholder.com/150x150/FF5722/FFFFFF?text=Food',
    'fresh': 'https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=Fresh',
    'household': 'https://via.placeholder.com/150x150/795548/FFFFFF?text=Household',
    'health': 'https://via.placeholder.com/150x150/009688/FFFFFF?text=Health',
    'atta': 'https://via.placeholder.com/150x150/D2691E/FFFFFF?text=Atta',
    'rice': 'https://via.placeholder.com/150x150/F4A460/FFFFFF?text=Rice',
    'dal': 'https://via.placeholder.com/150x150/A0522D/FFFFFF?text=Dal',
    'breakfast': 'https://via.placeholder.com/150x150/FFD54F/000000?text=Breakfast',
    'tea': 'https://via.placeholder.com/150x150/795548/FFFFFF?text=Tea',
    'coffee': 'https://via.placeholder.com/150x150/6F4E37/FFFFFF?text=Coffee',
    'sauces': 'https://via.placeholder.com/150x150/FF6B35/FFFFFF?text=Sauces',
    'spreads': 'https://via.placeholder.com/150x150/8B4513/FFFFFF?text=Spreads'
};

const genericCategoryImage = 'https://via.placeholder.com/150x150/CCCCCC/FFFFFF?text=Category';
const genericProductImage = 'https://via.placeholder.com/150x150/FF5722/FFFFFF?text=Product';

const fixAllImages = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Update ALL categories with working placeholder images
        const allCategories = await CategoryModel.find({});
        console.log(`Found ${allCategories.length} categories to update`);

        for (const category of allCategories) {
            const categoryName = category.name.toLowerCase();
            let imageUrl = genericCategoryImage;

            // Try to find matching image
            for (const [key, value] of Object.entries(categoryImageMap)) {
                if (categoryName.includes(key)) {
                    imageUrl = value;
                    break;
                }
            }

            await CategoryModel.findByIdAndUpdate(
                category._id,
                { image: imageUrl }
            );
            
            console.log(`✅ Updated: ${category.name} -> ${imageUrl}`);
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
            
            console.log(`✅ Updated product: ${product.name}`);
        }

        console.log('🎉 All images have been fixed successfully!');
        
    } catch (error) {
        console.error('❌ Error fixing images:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

// Run the fix
fixAllImages();
