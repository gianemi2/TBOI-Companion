/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                accent: "hsl(15, 18%, 4%)",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",

                border: "hsl(var(--border))",
                input: "hsl(224.28, 76.33%, 48.04%)",
                ring: "hsl(var(--ring))",
            },
            borderRadius: {
                lg: "var(--radius)",
            },
        },
    },
    plugins: [],
}