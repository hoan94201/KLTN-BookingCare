/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
    dest: 'public', // Destination directory for the PWA files
    disable: process.env.NODE_ENV === 'development', // Disable PWA in development mode
    register: true, // Register the PWA service worker
    skipWaiting: true, // Skip waiting for service worker activation
});

const nextConfig = {
    images: {
        domains: ['localhost', 'res.cloudinary.com', 'images.unsplash.com'],
    },
};

module.exports = withPWA(nextConfig);
