# 💌 Untuk Kamu — React Love Letter

Implementasi React dari desain scrapbook `desgin_base.html`: surat cinta bergaya
polaroid dengan animasi hati, musik ambient, dan tombol "nggak" yang kabur.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output ke dist/
npm run preview  # cek hasil build
```

## Struktur

```
public/images/            ilustrasi & maskot (lokal, tanpa CDN)
src/
  App.jsx                 susunan section halaman
  index.css               base style, gradient, safe-area
  components/
    Hero.jsx              pembuka + amplop interaktif
    Letter.jsx            surat tulisan tangan
    Gallery.jsx           4 polaroid memori
    Reasons.jsx           alasan-alasan sayang
    BigQuestion.jsx       pertanyaan besar + tombol "nggak" yang menghindar
    CelebrationDialog.jsx modal perayaan (portal ke <body>)
    MusicCharm.jsx        tombol musik ambient
    BunnyNote.jsx         catatan kecil melayang di pojok
    HeartBurstProvider.jsx canvas partikel hati (context + hook useHeartBurst)
  hooks/
    useAmbientMusic.js    melodi Web Audio API (tanpa file audio)
```

Token warna, tipografi (Comfortaa & Quicksand), spacing, dan radius sama persis
dengan desain asli dan didefinisikan di `tailwind.config.js`.

## Kustomisasi

- **Teks surat / alasan / caption:** ubah langsung di komponen terkait
  (`Letter.jsx`, `Reasons.jsx`, `Gallery.jsx`).
- **Foto kenangan:** ganti `public/images/memory-*.jpg` (rasio lanskap paling pas).
- **Maskot:** ganti `public/images/mascot-question.jpg` dan `mascot-celebration.jpg`.
- **Musik:** atur nada pada konstanta `MELODY` dan `BASS` di `useAmbientMusic.js`.
