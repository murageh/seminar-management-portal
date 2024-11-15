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
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}

