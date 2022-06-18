/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    fontFamily: {
      sans: ["Comic Sans", "ui-sans-serif", "system-ui"],
      serif: ["Comic Sans", "ui-serif", "Georgia"],
      mono: ["Comic Sans", "ui-monospace", "SFMono-Regular"],
    },
    extend: {
      colors: {
        darkbg: "#161b22",
        lightbg: "#1e2938",
      },
    },
  },
  plugins: [],
};
