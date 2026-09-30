/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tailwind hanya membuat CSS untuk kelas yang ditemukan di file-file ini
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        script: ['"Allura"', "cursive"],
      },
      // Warna brand: ubah di sini untuk mengganti tampilan seluruh template
      colors: {
        // Warna brand utama kampus (dipakai navbar, tombol, aksen)
        brand: {
          50: "#f0f3fa", // Sangat terang (background ringan, hover card)
          100: "#dce3f3", // Tint muda (border lembut, badge background)
          200: "#bdcae8", // Accent pastel
          300: "#94a9d9", // Secondary accent
          400: "#6483c6", // Muted brand color
          500: "#3f60ad", // Mid-tone brand
          600: "#2b478d", // Brand pendukung (hover state tombol utama)
          700: "#1A2A5B", // WARNA UTAMA (#1A2A5B - Navbar, Primary Button, Header)
          800: "#142047", // Deep Navy (Hover state tombol gelap)
          900: "#11193a", // Dark Navy (Footer background, text sangat gelap)
          950: "#0a0e24",
        },
        // Warna kedua untuk konten AIK (nuansa hijau islami)
        sakinah: {
          50: "#ecfdf5",
          100: "#d1fae5",
          500: "#10b981",
          600: "#047857",
          700: "#065f46",
        },
      },
    },
  },
  plugins: [],
};
