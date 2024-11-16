/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#4E1ED4",
            },
            borderWidth: {
                "3": "3px",
            },
            fontFamily: {
                'gothic': ['Century Gothic', 'sans-serif'],
            },
            duration: {
                1500: '1500ms',
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}

