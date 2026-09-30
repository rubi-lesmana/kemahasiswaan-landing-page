# Portal Kampus: Kemahasiswaan & Al-Islam Kemuhammadiyahan
Urutan halaman dari atas ke bawah:

1. **Beranda** (`#beranda`) &mdash; hero + dua kartu pintu utama + statistik ringkas
2. **Kemahasiswaan** (`#kemahasiswaan`) &mdash; divider section, lalu:
   - Organisasi Mahasiswa (`#organisasi`)
   - Unit Kegiatan Mahasiswa (`#ukm`)
   - Prestasi Mahasiswa (`#prestasi`)
   - Layanan Mahasiswa (`#layanan`)
3. **Al-Islam & Kemuhammadiyahan** (`#aik`) &mdash; divider section, lalu:
   - Kegiatan Keagamaan (`#kegiatan`)
   - Kajian (`#kajian`)
   - Syiar (`#syiar`)
   - Nilai Kemuhammadiyahan (`#nilai`)

## Navigasi

- **Navbar melayang (floating pill)** dengan efek kaca, tetap ada di atas saat discroll (`sticky`).
- **Dropdown "Kemahasiswaan"** dan **"Al-Islam & Kemuhammadiyahan"**: diklik/tap (bukan cuma hover)
  untuk memilih sub-section, lalu halaman scroll otomatis ke bagian yang dipilih.
- **Scroll-spy**: nama menu di navbar (termasuk tombol dropdown) otomatis tersorot mengikuti
  section mana yang sedang dibaca &mdash; tidak perlu diklik untuk aktif.
- **Menu mobile**: hamburger membuka daftar menu, submenu tampil sebagai akordeon (klik untuk buka/tutup).
- Setiap section punya `scroll-mt-28` supaya tidak tertutup navbar melayang saat dituju lewat anchor.

## Struktur folder

```
usm-staik-landing/
├── dist/
│   ├── components/
│   │   ├── aik/
│   │   │   ├── kajian/
│   │   │   ├── keagamaan/
│   │   │   ├── nilai/
│   │   │   └── syiar/
│   │   ├── kemahasiswaan/
│   │   │   ├── layanan/
│   │   │   ├── ormawa/
│   │   │   ├── prestasi/
│   │   │   └── ukm/
│   │   ├── faq.html
│   │   ├── footer.html
│   │   ├── hero.html
│   │   └── navbar.html
│   ├── css/
│   ├── images/
│   ├── js/
│   │   ├── karir.js
│   │   ├── keagamaan.js
│   │   ├── main.js
│   │   ├── prestasi.js
│   │   └── syiar.js
│   ├── detail-karir.html
│   ├── detail-keagamaan.html
│   ├── detail-prestasi.html
│   ├── detail-syiar.html
│   └── index.html
├── src/
│   └── css/
│       └── input.css
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── tailwind.config.js
```

## Menjalankan

```bash
npm install
npm run dev        # mode watch
```

Buka `dist/index.html` di browser, atau pakai Live Server di VS Code.

## Catatan desain

- Warna **navy (`brand-*`)** dipakai konsisten untuk Kemahasiswaan.
- Warna **hijau (`sakinah-*`)** dipakai konsisten untuk Al-Islam & Kemuhammadiyahan.
  Ubah nilainya di `tailwind.config.js` kalau ingin warna lain.
- Semua nama organisasi, UKM, jadwal, dan kutipan di halaman ini adalah **contoh (dummy)**
  untuk keperluan desain, dan sudah ditandai dengan catatan kecil di bawah tiap seksi.

