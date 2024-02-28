/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
    mode: 'jit',
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        colors: {
            ...colors,
            black: '#000',
            white: '#fff',
            primary: '#45C3D2',
            secondary: '#4F46E5',
            success: '#DCFCE7',
            warning: '#FFB119',
            danger: '#DC2626',
            overlay: '#6B7280',
        },
        extend: {
            dropShadow: {
                text: '1px 1px 1px #333',
            },
            backgroundImage: {
                text: 'linear-gradient(rgba(126,126,126,0.25),rgba(255,255,255,0.1))',
                background: 'linear-gradient(135deg, rgba(34,193,195,1) 0%,  rgba(253,187,45,1) 100%)',
                gradients: 'linear-gradient(145deg, #03a9f4 0%, #93d4dc 25%, #fcb045 50%, #ff9800 75%, #f4511e 100%)',
            },
            backgroundColor: {
                mainColor: '#0071ba',
                button: '#0d6efd',
            },
            fontFamily: {
                fangsong: 'fangsong',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
