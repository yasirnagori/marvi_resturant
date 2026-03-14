/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#f97316', // Orange-500
                secondary: '#ea580c', // Orange-600
            }
        },
    },
    plugins: [],
}
