# Algoritma Alur PPDB TK Azalia

## Struktur Status PPDB

### Status Utama
- **BELUM** (Status Awal)
  - Diberikan saat siswa baru membuat akun
  - Belum mengisi data pendaftaran
  - Belum memilih kelas
  - Belum upload dokumen
  - Aksi: Lengkapi data di halaman "Data Pendaftaran"

- **MENUNGGU** (Status Verifikasi)
  - Diberikan ketika semua data sudah lengkap dan dikonfirmasi
  - Data sudah lengkap (form + kelas + berkas)
  - Admin sedang memverifikasi kelengkapan dan validitas dokumen
  - Aksi: Tunggu hasil verifikasi admin

- **LULUS** (Status Diterima)
  - Diberikan setelah admin menerima siswa
  - Siswa lulus seleksi PPDB
  - Dapat melanjutkan ke tahap daftar ulang
  - Status Final - Tidak dapat perubahan data lagi

- **TIDAK_LULUS** (Status Ditolak)
  - Diberikan setelah admin menolak siswa
  - Siswa tidak lolos seleksi
  - Catatan akan berisi alasan penolakan
  - Status Final - Tidak dapat perubahan data lagi

## Alur Pendaftaran

### 1. Registrasi (Status: BELUM)
```
User membuat akun baru
↓
System membuat record Siswa dengan status_ppdb = 'belum'
↓
Siswa diarahkan ke halaman "Ringkasan" Dashboard
```

### 2. Lengkapi Data (Status: BELUM → BELUM)
```
Siswa masuk ke halaman "Data Pendaftaran"
↓
Isi form:
  - Data Calon Siswa (nama, tempat lahir, tgl lahir, dll)
  - Data Orang Tua (nama ayah/ibu, pekerjaan, kontak, alamat)
  - Pilih Kelas (TK-A atau TK-B)
↓
Klik "Simpan Data PPDB"
↓
Kelas terkunci setelah dipilih pertama kali (tidak bisa diubah)
↓
Status tetap BELUM (belum semua dokumen)
```

### 3. Upload Dokumen (Status: BELUM → BELUM)
```
Siswa masuk ke halaman "Upload Berkas"
↓
Upload dokumen persyaratan:
  - Akta Kelahiran
  - Kartu Keluarga
  - Pas Foto 4x6
↓
Admin dapat melihat status validasi setiap dokumen:
  - Menunggu: dokumen sudah upload, belum divalidasi
  - Valid: dokumen lolos validasi
  - Tidak Valid: dokumen tidak memenuhi persyaratan
↓
Status tetap BELUM sampai semua dokumen valid
```

### 4. Konfirmasi Lengkap (Status: BELUM → MENUNGGU)
```
Ketika semua data dan dokumen sudah lengkap:
  ✓ Semua field form terisi
  ✓ Kelas sudah dipilih
  ✓ Semua dokumen sudah upload dan valid

Admin atau Sistem otomatis mengkonfirmasi kelengkapan
↓
Status berubah dari BELUM menjadi MENUNGGU
↓
Siswa tidak bisa mengubah data/kelas lagi
↓
Admin memulai proses verifikasi
```

### 5. Verifikasi Admin (Status: MENUNGGU)
```
Admin memeriksa:
  ✓ Kelengkapan formulir data
  ✓ Validitas dokumen
  ✓ Kesesuaian dengan persyaratan
↓
Admin memberikan catatan (opsional) jika ada kekurangan
↓
Siswa dapat melihat progress di halaman "Status PPDB"
```

### 6. Pengumuman Hasil (Status: MENUNGGU → LULUS / TIDAK_LULUS)
```
Admin membuat keputusan:
  - Lolos → Status = LULUS
  - Tidak Lolos → Status = TIDAK_LULUS
↓
Catatan diberikan (khusus untuk tidak lolos)
↓
Siswa yang LULUS dapat melihat pengumuman
↓
Siswa yang TIDAK_LULUS dapat melihat alasan penolakan
```

## Menu Navigasi Siswa

### Sidebar Menu (Urutan Alur)
1. **Ringkasan** → [/dashboard/siswa]
   - Lihat ringkasan status PPDB
   - Lihat kelas yang dipilih
   - Quick access ke menu lain

2. **Panduan PPDB** → [/dashboard/siswa/panduan]
   - Baca alur dan persyaratan PPDB
   - Informasi sekolah dan program kelas

3. **Data Pendaftaran** → [/dashboard/siswa/data-ppdb]
   - **Aktif**: di tahap BELUM
   - Isi form data siswa & orang tua
   - Pilih kelas (terkunci setelah dipilih)
   - **Disabled**: saat MENUNGGU, LULUS, TIDAK_LULUS

4. **Upload Berkas** → [/dashboard/siswa/berkas]
   - Upload dokumen persyaratan
   - Lihat status validasi setiap dokumen
   - **Disabled**: saat PPDB berakhir atau status final

5. **Status PPDB** → [/dashboard/siswa/status]
   - Lihat status verifikasi terkini
   - Lihat catatan dari admin (jika ada)
   - Info hasil akhir (Lulus/Tidak Lulus)

6. **Pelengkapan Data** → [/dashboard/siswa/profile]
   - Tab 1: Pelengkapan Data
     - Link ke Data Pendaftaran
     - Link ke Upload Berkas
     - Link ke Status PPDB
   - Tab 2: Panduan PPDB
     - Ringkasan alur 5 tahap
     - Link ke panduan lengkap
   - Tab 3: Akun
     - Edit profil akun (nama, email, telepon)

## Ringkasan Status Display

### Dashboard Ringkasan
```
┌─────────────────────────────────────┐
│     Ringkasan Pendaftaran           │
├─────────────────────────────────────┤
│ Status PPDB: [Badge Status]         │
│   - Belum Lengkap (Gray)            │
│   - Menunggu Keputusan (Amber)      │
│   - Diterima (Green)                │
│   - Ditolak (Red)                   │
├─────────────────────────────────────┤
│ Kelas Terpilih: [Kelas Name]        │
│   - Jika sudah dipilih: Tampil nama │
│   - Jika belum: "Belum Dipilih"     │
└─────────────────────────────────────┘
```

### Status PPDB Page
```
BELUM:
  📌 Data Pendaftaran Belum Lengkap
  - Data siswa & orang tua belum disi
  - Kelas belum dipilih
  - Dokumen belum upload
  Aksi: Lengkapi di "Data Pendaftaran"

MENUNGGU:
  ⏳ Data Anda Sedang Diverifikasi
  - Terima kasih melengkapi semua data
  - Tim admin sedang memeriksa
  - Pengumuman sesuai jadwal
  Aksi: Tunggu & pantau halaman ini

LULUS:
  ✅ Selamat! Kamu Lulus!
  - Diterima di TK Azalia
  - Siapkan untuk daftar ulang
  - Pesan dari sekolah (jika ada)
  Aksi: Ikuti petunjuk daftar ulang

TIDAK_LULUS:
  ❌ Tetap Semangat Ya!
  - Jangan berkecil hati
  - Alasan penolakan: [Catatan]
  - Coba lagi tahun depan
  Aksi: Hubungi admin jika ada pertanyaan
```

## Tech Implementation

### Database
- Schema: Prisma ORM dengan PostgreSQL
- Enum: StatusPpdb (belum, menunggu, lulus, tidak_lulus)
- Default: status_ppdb = 'belum' untuk siswa baru

### Frontend
- Framework: Next.js 13+ (App Router)
- UI: Tailwind CSS + Framer Motion
- Components:
  - SiswaDashboard: Ringkasan & Quick Access
  - ClassSelection: Pilih kelas (readonly after selection)
  - SiswaStatusSection: Status detail dengan mascot
  - FormPpdb: Isi data pendaftaran
  - FileUpload: Upload dokumen

### API Endpoints
- GET /api/ppdb/siswa/me: Get data siswa
- PUT /api/ppdb/siswa: Update data siswa
- POST /api/ppdb/kelas/select: Simpan pilihan kelas
- GET /api/ppdb/kelas: List kelas tersedia
- GET /api/ppdb/status: Get status PPDB
- GET /api/ppdb/berkas: List dokumen
- POST /api/ppdb/berkas: Upload dokumen

## Notes Penting

1. **Kelas Terkunci**: Setelah dipilih pertama kali, tidak bisa diubah
2. **Data Immutable**: Setelah status MENUNGGU, data tidak bisa diubah
3. **Catatan Admin**: Hanya terlihat saat status TIDAK_LULUS (alasan penolakan)
4. **Timeline**: Perubahan status hanya bisa dilakukan oleh Admin
5. **Dokumentasi Penting**: Setiap tahap dijelaskan di "Panduan PPDB"
