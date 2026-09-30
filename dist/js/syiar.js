/* Data syiar + pengisi halaman detail-syiar.html?id=... */

// Tambah materi syiar baru cukup dengan menambah satu objek di sini
window.SYIAR = [
  {
    id: "fatwa-tarjih-media-sosial",
    title: "Hukum dan Fiqih Bermedia Sosial menurut Majelis Tarjih",
    category: "Fatwa Tarjih",
    author: "Majelis Tarjih",
    views: "342",
    lead: "Tuntunan dan panduan etika berinteraksi digital sesuai keputusan Majelis Tarjih dan Tajdid.",
    image:
      "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=1160",
  },
  {
    id: "amaliyah-salat-lail-dzikir",
    title: "Tuntunan Salat Lail dan Dzikir Sesuai HPT Muhammadiyah",
    category: "Amaliyah",
    author: "Tim LPPI",
    views: "518",
    lead: "Panduan praktis amaliyah ibadah malam dan zikir berdasarkan Himpunan Putusan Tarjih.",
    image:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=1160",
  },
  {
    id: "doa-penuntut-ilmu",
    title: "Kumpulan Do'a Penuntut Ilmu dalam Perkuliahan",
    category: "Do'a Thalabul 'Ilmi",
    author: "Redaksi AIK",
    views: "289",
    lead: "Do'a memohon kelancaran belajar, keberkahan ilmu, serta kemudahan ujian bagi mahasiswa.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1160",
  },
];

// Dipanggil dari main.js setelah komponen selesai dimuat
function initSyiarDetail() {
  const root = document.querySelector("[data-syiar-detail]");
  if (!root) return; // bukan halaman detail syiar

  // Ambil ?id= dari URL; jika kosong/salah, tampilkan materi pertama
  const id = new URLSearchParams(window.location.search).get("id");
  const item = window.SYIAR.find((s) => s.id === id) ?? window.SYIAR[0];

  const setText = (selector, value) => {
    const node = root.querySelector(selector);
    if (node) node.textContent = value;
  };

  setText("[data-syiar-title]", item.title);
  setText("[data-syiar-category]", item.category);
  setText("[data-syiar-author]", item.author);
  setText("[data-syiar-views]", `${item.views} kali`);
  setText("[data-syiar-lead]", item.lead);

  const img = root.querySelector("[data-syiar-image]");
  if (img) {
    img.src = item.image;
    img.alt = item.title;
  }

  document.title = `${item.title} | Universitas Siber Muhammadiyah`;
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", item.lead);
}
