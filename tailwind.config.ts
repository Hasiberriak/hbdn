import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sriracha: ["Sriracha", "cursive"],
        "share-tech": ["Share Tech", "monospace"],
        sans: ["Share Tech", "system-ui", "sans-serif"],
      },

      colors: {
        birthday: {
          pink: {
            50: "#fdf2f8",
            100: "#fce7f3",
            200: "#fbcfe8",
            300: "#f9a8d4",
            400: "#f472b6",
            500: "#ec4899",
            600: "#db2777",
            700: "#be185d",
            800: "#9d174d",
            900: "#831843",
          },
          purple: {
            50: "#faf5ff",
            100: "#f3e8ff",
            200: "#e9d5ff",
            300: "#d8b4fe",
            400: "#c084fc",
            500: "#a855f7",
            600: "#9333ea",
            700: "#7e22ce",
            800: "#6b21a8",
            900: "#581c87",
          },
        },
      },

      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        "bounce-slow": "bounce 3s infinite",
        "pulse-slow": "pulse 3s infinite",
        "spin-slow": "spin 8s linear infinite",
        typewriter: "typewriter 2s steps(40) 1s 1 normal both",
        blink: "blink 1s infinite",
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "scale-in": "scaleIn 0.8s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },

      keyframes: {
        glow: {
          "0%": {
            textShadow: "0 0 5px #ec4899, 0 0 10px #ec4899, 0 0 15px #ec4899",
            transform: "scale(1)",
          },
          "100%": {
            textShadow:
              "0 0 10px #ec4899, 0 0 20px #ec4899, 0 0 30px #ec4899, 0 0 40px #ec4899",
            transform: "scale(1.02)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        typewriter: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        scaleIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0.9)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        slideUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },

      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
      },

      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      boxShadow: {
        glow: "0 0 20px rgba(236, 72, 153, 0.3)",
        "glow-lg": "0 0 40px rgba(236, 72, 153, 0.4)",
        "inner-glow": "inset 0 0 20px rgba(236, 72, 153, 0.2)",
        soft: "0 4px 20px rgba(0, 0, 0, 0.1)",
        "soft-lg": "0 8px 30px rgba(0, 0, 0, 0.12)",
      },

      backdropBlur: {
        xs: "2px",
      },

      backgroundImage: {
        "birthday-gradient":
          "linear-gradient(135deg, #fce7f3 0%, #f3e8ff 50%, #fce7f3 100%)",
        "glow-gradient":
          "radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)",
        "heart-gradient":
          "linear-gradient(45deg, #ec4899, #f472b6, #ec4899)",
      },

      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "mobile-s": "320px",
        "mobile-m": "375px",
        "mobile-l": "425px",
        tablet: "768px",
        laptop: "1024px",
        "laptop-l": "1440px",
        desktop: "2560px",
      },

      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
    },
  },
  plugins: [animatePlugin],
};

export default config;
