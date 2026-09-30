/* Data kegiatan keagamaan + pengisi halaman detail-keagamaan.html?id=... */

// Tambah kegiatan baru cukup dengan menambah satu objek di sini
window.KEGIATAN = [
  {
    id: "baitul-arqam-maba",
    title: "Baitul Arqam Mahasiswa Baru",
    category: "Pembinaan AIK",
    date: "12–14 Februari 2026",
    image:
      "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=1160",
  },
  {
    id: "ramadhan-di-kampus",
    title: "Ramadhan di Kampus",
    category: "Ramadhan",
    date: "10–20 Maret 2026",
    image:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=1160",
  },
];

// Dipanggil dari main.js setelah komponen selesai dimuat
function initKeagamaanDetail() {
  const root = document.querySelector("[data-keagamaan-detail]");
  if (!root) return; // bukan halaman detail keagamaan

  // Ambil ?id= dari URL; jika kosong/salah, tampilkan kegiatan pertama
  const id = new URLSearchParams(window.location.search).get("id");
  const item = window.KEGIATAN.find((k) => k.id === id) ?? window.KEGIATAN[0];

  const setText = (selector, value) => {
    const node = root.querySelector(selector);
    if (node) node.textContent = value;
  };

  setText("[data-keagamaan-title]", item.title);
  setText("[data-keagamaan-category]", item.category);
  setText("[data-keagamaan-date]", item.date);

  const img = root.querySelector("[data-keagamaan-image]");
  if (img) {
    img.src = item.image;
    img.alt = item.title;
  }

  document.title = `${item.title} | Universitas Siber Muhammadiyah`;
}
