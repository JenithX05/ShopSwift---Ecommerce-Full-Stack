import mongoose from 'mongoose';
import CategoryModel from '../models/category.model.js';
import dotenv from 'dotenv';

dotenv.config();

const defaultCategories = [
    {
        name: 'Fruits & Vegetables',
        image: 'https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=Fruits+%26+Vegetables'
    },
    {
        name: 'Dairy & Breakfast',
        image: 'https://via.placeholder.com/150x150/2196F3/FFFFFF?text=Dairy+%26+Breakfast'
    },
    {
        name: 'Bakery & Biscuits',
        image: 'https://via.placeholder.com/150x150/FF9800/FFFFFF?text=Bakery'
    },
    {
        name: 'Staples',
        image: 'https://via.placeholder.com/150x150/795548/FFFFFF?text=Staples'
    },
    {
        name: 'Snacks & Branded Foods',
        image: 'https://via.placeholder.com/150x150/E91E63/FFFFFF?text=Snacks'
    },
    {
        name: 'Beverages',
        image: 'https://via.placeholder.com/150x150/00BCD4/FFFFFF?text=Beverages'
    },
    {
        name: 'Personal Care',
        image: 'https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=Personal+Care'
    },
    {
        name: 'Home Care',
        image: 'https://via.placeholder.com/150x150/607D8B/FFFFFF?text=Home+Care'
    },
    {
        name: 'Baby Care',
        image: 'https://via.placeholder.com/150x150/FFC107/000000?text=Baby+Care'
    },
    {
        name: 'Meat & Fish',
        image: 'https://via.placeholder.com/150x150/F44336/FFFFFF?text=Meat+%26+Fish'
    }
];

const seedCategories = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Check existing categories
        const existingCategories = await CategoryModel.find({});
        console.log(`Found ${existingCategories.length} existing categories`);

        if (existingCategories.length === 0) {
            // Add default categories if none exist
            const insertedCategories = await CategoryModel.insertMany(defaultCategories);
            console.log(`✅ Inserted ${insertedCategories.length} default categories`);
        } else {
            console.log('Categories already exist. Skipping category seeding.');
        }

        // Update any categories without images
        const categoriesWithoutImages = await CategoryModel.find({
            $or: [
                { image: '' },
                { image: null },
                { image: { $exists: false } }
            ]
        });

        if (categoriesWithoutImages.length > 0) {
            console.log(`Updating ${categoriesWithoutImages.length} categories without images...`);
            
            for (const category of categoriesWithoutImages) {
                const defaultCategory = defaultCategories.find(
                    cat => cat.name.toLowerCase() === category.name.toLowerCase()
                );
                
                const imageUrl = defaultCategory?.image || 'https://via.placeholder.com/150x150/CCCCCC/FFFFFF?text=Category';
                
                await CategoryModel.findByIdAndUpdate(
                    category._id,
                    { image: imageUrl }
                );
                
                console.log(`Updated category: ${category.name}`);
            }
        }

        console.log('✅ Category seeding completed successfully');
        
    } catch (error) {
        console.error('❌ Error seeding categories:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

// Run the seed function
seedCategories();
