// Image fallback utility
export const getImageFallback = () => {
    return '/logo.png' // Use the existing logo as fallback
}

export const handleImageError = (e) => {
    e.target.src = getImageFallback()
    e.target.onerror = null
}
