/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            transparent: "transparent",
            current: "currentColor",
            black: "#000",
            white: "#fff",
            primary: "#00d3fb",
            "text-primary": "#003652",
            "primary-2": "#01b5f2",
            "primary-3": "#1ea0fe",
            orange: {
                100: "#ffb54a",
                200: "#df8e19",
                300: "#e68a00",
                400: "#e68a00",
                500: "#e68a00",
                600: "#e68a00",
                700: "#e68a00",
                800: "#e68a00",
                900: "#e68a00",
                coral: "#ff7f50",
                tomato: "#ff6347",
                orangered: "#ff4500",
                darkorange: "#ff8c00",
                orange: "#ffa500",
            },
            red: {
                100: "#f87171",
                200: "#ef4444",
                300: "#dc2626",
                400: "#b91c1c",
                500: "#991b1b",
                600: "#7f1d1d",
                700: "#702424",
                800: "#572525",
                900: "#4b1d1d",
            },

            gray: {
                100: "#f7fafc",
                200: "#edf2f7",
                300: "#e2e8f0",
                400: "#cbd5e0",
                500: "#a0aec0",
                600: "#718096",
                700: "#4a5568",
                800: "#2d3748",
                900: "#1a202c",
            },
            blue: {
                100: "#73c6d9",
                200: "#2A95BF",
                300: "#126DA6",
                400: "#1261A6",
            },
            yellow: {
                100: "#f6e05e",
                200: "#f9c74f",
                300: "#f9c74f",
                400: "#f9c74f",
                500: "#f9c74f",
                600: "#f9c74f",
                700: "#f9c74f",
                800: "#f9c74f",
                900: "#f9c74f",
            },
            bg: {
                main: "#e9f2f7",
            },
            green: {
                100: "#9ae6b4",
                200: "#68d391",
                300: "#48bb78",
                400: "#38a169",
                500: "#2f855a",
                600: "#276749",
                700: "#22543d",
                800: "#1c4532",
                900: "#153e2d",
            },
        },
        extend: {
            animation: {
                fadeIn: "fadeIn 0.5s ease-in-out",
                openToRight: "openToRight 0.5s linear",
                fadeOut: "fadeOut 0.5s ease-in-out",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0", transform: "translateY(1rem)" },
                    "100%": { opacity: "1", transform: "translateY(0px)" },
                },
                openToRight: {
                    "0%": { opacity: "0", width: "0" },
                    "100%": { opacity: "1", width: "100%" },
                },
                fadeOut: {
                    "0%": { opacity: "1", transform: "translateY(0)" },
                    "100%": { opacity: "0", transform: "translateY(1rem)" },
                },
            },
            backgroundImage: {
                "white-gradient-to-t": "linear-gradient(0deg, #e9f2f7, rgb(233 242 247  / 0%) 72.87%)",
            },
            clipPath: {
                right: "polygon(0 0, 100% 0, 5% 100%, 0 100%);",
            },
        },
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            "2lg": "1100px",
            xl: "1280px",
            "2xl": "1536px",
        },
    },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                ".clip-right": {
                    clipPath: "polygon(0 0, 100% 0, 5% 100%, 0 100%)",
                },
                ".line-clamp": {
                    2: {
                        display: "-webkit-box",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                    },
                    3: {
                        display: "-webkit-box",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                    },
                    4: {
                        display: "-webkit-box",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                    },
                },
            };

            addUtilities(newUtilities, ["responsive", "hover"]);
        },
    ],
};
