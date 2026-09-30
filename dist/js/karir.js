/* Data & logika halaman detail Karir (detail-karir.html) */

window.KARIR = {
  title: "Karir & Pengembangan",
  image:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600",
  whatsapp: "6281234567890", // tujuan pengiriman lamaran (ganti dengan nomor resmi)
  lowongan: [
    {
      type: "Magang / Part Time",
      title: "Magang Pemasaran Digital",
      desc: "Membantu pengelolaan media sosial, pembuatan konten, dan laporan kampanye bersama tim pemasaran.",
    },
    {
      type: "Full Time",
      title: "Staf Administrasi",
      desc: "Mengelola dokumen, arsip, dan korespondensi kantor serta mendukung kegiatan operasional harian.",
    },
    {
      type: "Magang",
      title: "Asisten Pengembang Web",
      desc: "Mendukung pengembangan dan pemeliharaan situs web dengan pendampingan dari tim teknologi.",
    },
    {
      type: "Part Time / Full Time",
      title: "Customer Service",
      desc: "Melayani pertanyaan pelanggan melalui telepon dan pesan, serta mencatat tindak lanjutnya.",
    },
  ],
};

// Dipanggil dari main.js setelah komponen selesai dimuat
function initKarirDetail() {
  const root = document.querySelector("[data-karir]");
  if (!root) return; // bukan halaman karir

  const { title, image, lowongan, whatsapp } = window.KARIR;

  // Hero
  root.querySelector("[data-karir-title]").textContent = title;
  root.querySelector("[data-karir-image]").src = image;
  document.title = `${title} | Universitas Siber Muhammadiyah`;

  // Helper pembuat elemen (class ditulis utuh agar terbaca scanner Tailwind)
  const el = (tag, className, text) => {
    const n = document.createElement(tag);
    if (className) n.className = className;
    if (text) n.textContent = text;
    return n;
  };

  // Kartu lowongan
  const list = root.querySelector("[data-karir-list]");
  list.replaceChildren(
    ...lowongan.map((l) => {
      const card = el(
        "article",
        "flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-900/5",
      );
      const body = el("div");
      body.append(
        el("p", "text-[11px] font-semibold text-slate-800", l.type),
        el("h3", "mt-3 text-lg font-bold text-slate-900", l.title),
        el("p", "mt-2 text-sm leading-relaxed text-slate-500", l.desc),
      );
      const btn = el(
        "button",
        "mt-6 self-start rounded-full bg-emerald-600 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-emerald-700",
        "Lamar Sekarang",
      );
      btn.type = "button";
      btn.dataset.apply = l.title;
      card.append(body, btn);
      return card;
    }),
  );

  // Pilihan posisi di formulir
  const select = root.querySelector("[data-karir-position]");
  lowongan.forEach((l) => select.add(new Option(l.title, l.title)));

  // "Lamar Sekarang" → isi posisi & arahkan ke formulir
  const form = root.querySelector("[data-karir-form]");
  list.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-apply]");
    if (!btn) return;
    select.value = btn.dataset.apply;
    form.scrollIntoView({ behavior: "smooth", block: "center" });
    form.elements.nama.focus({ preventScroll: true });
  });

  // Kirim lamaran → buka WhatsApp dengan pesan terisi
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const lines = [
      "Halo, saya ingin melamar.",
      `Nama: ${d.get("nama")}`,
      `Email: ${d.get("email")}`,
      `Posisi: ${d.get("posisi")}`,
    ];
    if (d.get("pesan")) lines.push(`Pesan: ${d.get("pesan")}`);
    window.open(
      `https://wa.me/${whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener",
    );
    form.reset();
  });
}
