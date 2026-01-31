// Default images for different categories
export const defaultImages = {
    // Category images using local assets
    categories: {
        'fruits': '/Best_Prices_Offers.png',
        'vegetables': '/Wide_Assortment.png', 
        'dairy': '/minute_delivery.png',
        'bakery': '/Binkeyit.png',
        'beverages': '/Best_Prices_Offers.png',
        'snacks': '/Wide_Assortment.png',
        'personal care': '/minute_delivery.png',
        'home care': '/Binkeyit.png',
        'baby care': '/Best_Prices_Offers.png',
        'meat': '/Wide_Assortment.png',
        'staples': '/minute_delivery.png'
    },
    
    // Default product image
    product: '/logo.png',
    
    // Default category image (fallback)
    category: '/Binkeyit.png'
};

// Get appropriate image for category
export const getCategoryImage = (categoryName) => {
    if (!categoryName) return defaultImages.category;
    
    const normalizedName = categoryName.toLowerCase();
    
    // Try to find exact match
    if (defaultImages.categories[normalizedName]) {
        return defaultImages.categories[normalizedName];
    }
    
    // Try partial match
    for (const [key, value] of Object.entries(defaultImages.categories)) {
        if (normalizedName.includes(key)) {
            return value;
        }
    }
    
    return defaultImages.category;
};

// Get product image with fallback
export const getProductImage = (images) => {
    if (!images || !Array.isArray(images) || images.length === 0) {
        return defaultImages.product;
    }
    
    return images[0] || defaultImages.product;
};
