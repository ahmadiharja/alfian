// Data layer — static fallbacks + API integration

// Keep static reference data as fallbacks
const KECAMATAN_KOTA = [
  { nama: "Mojoroto", jumlah: 142 },
  { nama: "Kota", jumlah: 189 },
  { nama: "Pesantren", jumlah: 167 },
];

const KECAMATAN_KAB = [
  { nama: "Pare", jumlah: 98 },
  { nama: "Ngasem", jumlah: 87 },
  { nama: "Gurah", jumlah: 76 },
  { nama: "Kandangan", jumlah: 71 },
  { nama: "Plosoklaten", jumlah: 64 },
  { nama: "Kepung", jumlah: 58 },
  { nama: "Wates", jumlah: 55 },
  { nama: "Ngadiluwih", jumlah: 52 },
  { nama: "Badas", jumlah: 49 },
  { nama: "Kandat", jumlah: 47 },
  { nama: "Semen", jumlah: 44 },
  { nama: "Mojo", jumlah: 42 },
  { nama: "Pagu", jumlah: 39 },
  { nama: "Papar", jumlah: 37 },
  { nama: "Purwoasri", jumlah: 35 },
  { nama: "Plemahan", jumlah: 34 },
  { nama: "Kunjang", jumlah: 31 },
  { nama: "Kras", jumlah: 30 },
  { nama: "Ringinrejo", jumlah: 28 },
  { nama: "Kayen Kidul", jumlah: 27 },
  { nama: "Banyakan", jumlah: 25 },
  { nama: "Gampengrejo", jumlah: 24 },
  { nama: "Ngancar", jumlah: 22 },
  { nama: "Puncu", jumlah: 20 },
  { nama: "Grogol", jumlah: 18 },
  { nama: "Tarokan", jumlah: 17 },
];

const UNIVERSITAS = [
  { nama: "IAIN Kediri", singkat: "IAIN", jumlah: 412, kota: "Kediri" },
  { nama: "Universitas Nusantara PGRI Kediri", singkat: "UNP Kediri", jumlah: 287, kota: "Kediri" },
  { nama: "Universitas Islam Kadiri", singkat: "UNISKA", jumlah: 198, kota: "Kediri" },
  { nama: "UIN Sayyid Ali Rahmatullah Tulungagung", singkat: "UIN SATU", jumlah: 134, kota: "Tulungagung" },
  { nama: "Universitas Brawijaya", singkat: "UB", jumlah: 89, kota: "Malang" },
  { nama: "UIN Sunan Ampel Surabaya", singkat: "UINSA", jumlah: 76, kota: "Surabaya" },
  { nama: "Universitas Negeri Malang", singkat: "UM", jumlah: 64, kota: "Malang" },
  { nama: "UIN Maulana Malik Ibrahim Malang", singkat: "UIN Malang", jumlah: 58, kota: "Malang" },
  { nama: "Universitas Airlangga", singkat: "UNAIR", jumlah: 41, kota: "Surabaya" },
  { nama: "Universitas Negeri Surabaya", singkat: "UNESA", jumlah: 37, kota: "Surabaya" },
  { nama: "Universitas Gadjah Mada", singkat: "UGM", jumlah: 22, kota: "Yogyakarta" },
  { nama: "UIN Sunan Kalijaga", singkat: "UIN SUKA", jumlah: 19, kota: "Yogyakarta" },
];

const JURUSAN = [
  { nama: "Pendidikan Agama Islam", jumlah: 187 },
  { nama: "Hukum Keluarga Islam", jumlah: 124 },
  { nama: "Ekonomi Syariah", jumlah: 112 },
  { nama: "Manajemen", jumlah: 98 },
  { nama: "Pendidikan Bahasa Inggris", jumlah: 87 },
  { nama: "Tadris Bahasa Arab", jumlah: 76 },
  { nama: "Komunikasi Penyiaran Islam", jumlah: 71 },
  { nama: "Hukum", jumlah: 64 },
  { nama: "Teknik Informatika", jumlah: 58 },
  { nama: "Akuntansi", jumlah: 52 },
  { nama: "Ilmu Politik", jumlah: 41 },
  { nama: "Sosiologi", jumlah: 37 },
];

const PEKERJAAN = [
  { nama: "Guru / Pengajar", jumlah: 342, icon: "G" },
  { nama: "Wiraswasta", jumlah: 287, icon: "W" },
  { nama: "PNS / ASN", jumlah: 198, icon: "P" },
  { nama: "Dosen", jumlah: 134, icon: "D" },
  { nama: "Karyawan Swasta", jumlah: 187, icon: "K" },
  { nama: "Politisi / Legislatif", jumlah: 64, icon: "L" },
  { nama: "NGO / Aktivis Sosial", jumlah: 58, icon: "N" },
  { nama: "Jurnalis / Media", jumlah: 41, icon: "J" },
  { nama: "Penyuluh Agama", jumlah: 76, icon: "A" },
  { nama: "Profesi (Hukum/Kesehatan)", jumlah: 89, icon: "P" },
  { nama: "Mahasiswa Pascasarjana", jumlah: 52, icon: "M" },
  { nama: "Lainnya", jumlah: 73, icon: "L" },
];

// Keep 8 static alumni as initial data (will be replaced by API)
const ALUMNI_LIST = [
  { id: "PMII-K-2018-0142", nama: "Ahmad Fauzi Ridwan", angkatan: 2018, kampus: "IAIN Kediri", jurusan: "Pendidikan Agama Islam", kecamatan: "Mojoroto", wilayah: "Kota Kediri", pekerjaan: "Guru / Pengajar", jabatan: "Guru MTs", status: "Menikah", anak: 2, foto: "AF" },
  { id: "PMII-K-2016-0087", nama: "Siti Nur Hidayah", angkatan: 2016, kampus: "Universitas Nusantara PGRI Kediri", jurusan: "Pendidikan Bahasa Inggris", kecamatan: "Pare", wilayah: "Kab. Kediri", pekerjaan: "Dosen", jabatan: "Dosen Tetap", status: "Menikah", anak: 1, foto: "SN" },
  { id: "PMII-K-2019-0231", nama: "Muhammad Iqbal Hakim", angkatan: 2019, kampus: "Universitas Brawijaya", jurusan: "Hukum", kecamatan: "Kota", wilayah: "Kota Kediri", pekerjaan: "Profesi (Hukum/Kesehatan)", jabatan: "Advokat", status: "Belum Menikah", anak: 0, foto: "MI" },
  { id: "PMII-K-2015-0054", nama: "Nur Aisyah Rahmawati", angkatan: 2015, kampus: "UIN Sayyid Ali Rahmatullah", jurusan: "Hukum Keluarga Islam", kecamatan: "Ngasem", wilayah: "Kab. Kediri", pekerjaan: "PNS / ASN", jabatan: "Penghulu KUA", status: "Menikah", anak: 3, foto: "NA" },
  { id: "PMII-K-2020-0298", nama: "Reza Maulana Pratama", angkatan: 2020, kampus: "IAIN Kediri", jurusan: "Ekonomi Syariah", kecamatan: "Pesantren", wilayah: "Kota Kediri", pekerjaan: "Wiraswasta", jabatan: "Owner UMKM", status: "Menikah", anak: 1, foto: "RM" },
  { id: "PMII-K-2017-0118", nama: "Lailatul Maghfiroh", angkatan: 2017, kampus: "UIN Sunan Ampel Surabaya", jurusan: "Komunikasi Penyiaran Islam", kecamatan: "Gurah", wilayah: "Kab. Kediri", pekerjaan: "Jurnalis / Media", jabatan: "Reporter", status: "Belum Menikah", anak: 0, foto: "LM" },
  { id: "PMII-K-2014-0021", nama: "Abdullah Faqih Mansyur", angkatan: 2014, kampus: "Universitas Islam Kadiri", jurusan: "Manajemen", kecamatan: "Kandangan", wilayah: "Kab. Kediri", pekerjaan: "Politisi / Legislatif", jabatan: "Anggota DPRD", status: "Menikah", anak: 2, foto: "AF" },
  { id: "PMII-K-2021-0312", nama: "Khoirun Nisa Salsabila", angkatan: 2021, kampus: "IAIN Kediri", jurusan: "Tadris Bahasa Arab", kecamatan: "Mojoroto", wilayah: "Kota Kediri", pekerjaan: "Guru / Pengajar", jabatan: "Guru Privat", status: "Belum Menikah", anak: 0, foto: "KN" },
];

const EVENTS = [
  { id: 1, judul: "Halal Bi Halal Akbar Alumni PMII Kediri Raya", tanggal: "2026-06-14", waktu: "08:00 - 14:00 WIB", lokasi: "Gedung Bagawanta Bhari, Kota Kediri", kategori: "Silaturahmi", peserta: 487, kuota: 800, deskripsi: "Pertemuan tahunan alumni PMII se-Kediri Raya.", pemateri: "KH. Ahmad Fauzi, M.Si" },
  { id: 2, judul: "Workshop Penulisan & Riset Sosial Keagamaan", tanggal: "2026-07-05", waktu: "13:00 - 17:00 WIB", lokasi: "Aula IAIN Kediri", kategori: "Pelatihan", peserta: 124, kuota: 150, deskripsi: "Workshop intensif penulisan artikel jurnal.", pemateri: "Dr. Hj. Nur Aisyah, M.A" },
  { id: 3, judul: "Sekolah Wirausaha Alumni — Batch 4", tanggal: "2026-08-10", waktu: "09:00 - 16:00 WIB", lokasi: "Co-working Space Mojoroto", kategori: "Ekonomi", peserta: 67, kuota: 100, deskripsi: "Pendampingan intensif 6 minggu.", pemateri: "Tim Praktisi & Inkubator" },
  { id: 4, judul: "Konsolidasi Alumni Menuju Pemilu Daerah 2027", tanggal: "2026-09-22", waktu: "19:30 - 22:00 WIB", lokasi: "Kantor Alumni Pare", kategori: "Politik", peserta: 89, kuota: 200, deskripsi: "Diskusi terbuka konsolidasi gerakan alumni.", pemateri: "Forum Alumni Senior" },
];

const DONASI_PROGRAM = [
  { judul: "Beasiswa Anak Alumni Kurang Mampu", target: 250000000, terkumpul: 187500000, donatur: 142, deadline: "2026-12-31" },
  { judul: "Pembangunan Sekretariat Bersama Alumni", target: 500000000, terkumpul: 312000000, donatur: 287, deadline: "2027-03-31" },
  { judul: "Bantuan Bencana & Kemanusiaan", target: 100000000, terkumpul: 87500000, donatur: 198, deadline: "Berkelanjutan" },
];

Object.assign(window, {
  KECAMATAN_KOTA, KECAMATAN_KAB, UNIVERSITAS, JURUSAN, PEKERJAAN,
  ALUMNI_LIST, EVENTS, DONASI_PROGRAM,
});
