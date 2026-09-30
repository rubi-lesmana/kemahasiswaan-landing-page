/* Data prestasi + pengisi halaman detail-prestasi.html?id=... */

// Tambah prestasi baru cukup dengan menambah satu objek di sini
window.PRESTASI = [
  {
    id: "juara-1-lkti",
    title: "Juara 1 Lomba Karya Tulis Ilmiah Tingkat Nasional 2026",
    category: "Nasional",
    date: "12 Maret 2026",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1160",
  },
  {
    id: "juara-2-business-plan",
    title: "Juara 2 Business Plan Competition",
    category: "Wilayah",
    date: "20 April 2026",
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1160",
  },
  {
    id: "finalis-kontes-robot",
    title: "Finalis Kontes Robot Indonesia",
    category: "Internasional",
    date: "15 November 2025",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1160",
  },
];

// Dipanggil dari main.js setelah komponen selesai dimuat
function initPrestasiDetail() {
  const root = document.querySelector("[data-prestasi-detail]");
  if (!root) return; // bukan halaman detail prestasi

  // Ambil ?id= dari URL; jika kosong/salah, tampilkan prestasi pertama
  const id = new URLSearchParams(window.location.search).get("id");
  const item = window.PRESTASI.find((p) => p.id === id) ?? window.PRESTASI[0];

  const setText = (selector, value) => {
    const node = root.querySelector(selector);
    if (node) node.textContent = value;
  };

  setText("[data-prestasi-title]", item.title);
  setText("[data-prestasi-category]", item.category);
  setText("[data-prestasi-date]", item.date);

  const img = root.querySelector("[data-prestasi-image]");
  if (img) {
    img.src = item.image;
    img.alt = item.title;
  }

  document.title = `${item.title} | Universitas Siber Muhammadiyah`;
}
