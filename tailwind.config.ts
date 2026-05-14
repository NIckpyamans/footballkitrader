import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./mobile/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050608",
        graphite: "#101217",
        pitch: "#151916",
        volt: "#D8FF3E",
        mint: "#7CFFBC",
        gold: "#D7B56D",
        champagne: "#F6E7B5",
        steel: "#A8B0B9"
      },
      boxShadow: {
        glow: "0 0 48px rgba(216,255,62,0.14)",
        glass: "0 24px 80px rgba(0,0,0,0.38)"
      },
      backgroundImage: {
        stadium:
          "radial-gradient(circle at 18% 8%, rgba(215,181,109,.24), transparent 28%), radial-gradient(circle at 82% 16%, rgba(216,255,62,.12), transparent 24%), radial-gradient(circle at 50% 90%, rgba(124,255,188,.08), transparent 30%), linear-gradient(135deg, #050608 0%, #101217 48%, #0f1115 100%)"
      }
    }
  },
  plugins: []
};

export default config;
