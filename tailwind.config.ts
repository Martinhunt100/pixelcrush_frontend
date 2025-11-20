import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function({ addUtilities }: any) {
      addUtilities({
        '.p-message': {
          padding: '2.3px !important',
        },
      })
    }
  ],
};

export default config;
