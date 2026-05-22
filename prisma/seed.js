const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Admin
  const hashedPassword = await bcrypt.hash('pmii2024', 10);
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@ikapmii.id' },
    update: {},
    create: {
      nama: 'Administrator IKA-PMII',
      email: 'admin@ikapmii.id',
      password: hashedPassword,
      jabatan: 'Ketua Umum',
    },
  });
  console.log('Admin created:', admin.email);

  // Pengaturan
  const pengaturan = await prisma.pengaturan.upsert({
    where: { id: 'settings-main' },
    update: {},
    create: {
      id: 'settings-main',
      namaCabang: 'Ikatan Alumni PMII Kediri Raya',
      singkatan: 'IKA-PMII Kediri',
      alamatSekretariat: 'Jl. KH. Ahmad Dahlan No. 12, Kota Kediri',
      emailResmi: 'info@ikapmii-kediri.org',
      noTelepon: '0354-123456',
      ketuaAktif: 'H. Ahmad Fauzi, S.H., M.H.',
      periode: '2023-2026',
    },
  });
  console.log('Pengaturan created');

  // Alumni data
  const alumniData = [
    // Kota Kediri - Mojoroto (25 alumni)
    {
      nia: 'IKA-001', namaLengkap: 'Ahmad Fauzi Rachman', tempatLahir: 'Kediri', tanggalLahir: new Date('1985-03-15'),
      jenisKelamin: 'L', noHp: '081234567001', email: 'ahmad.fauzi@gmail.com',
      wilayah: 'Kota Kediri', kecamatan: 'Mojoroto', kelurahan: 'Mojoroto',
      kampus: 'IAIN Kediri', fakultas: 'Syariah', jurusan: 'Hukum Islam', angkatan: 2003, tahunLulus: 2007, ipk: 3.72,
      komisariat: 'IAIN Kediri', jabatanTertinggi: 'Ketua Cabang',
      pekerjaanUtama: 'Advokat/Pengacara', jabatan: 'Advokat Senior', instansi: 'LBH Kediri',
      statusVerifikasi: 'verified', dataLengkap: true, statusKader: 'Muharrik',
      statusMapaba: true, statusPkd: true, statusPkl: true, statusPkn: true,
    },
    {
      nia: 'IKA-002', namaLengkap: 'Siti Fatimah Zahra', tempatLahir: 'Kediri', tanggalLahir: new Date('1990-07-22'),
      jenisKelamin: 'P', noHp: '081234567002', email: 'siti.fatimah@gmail.com',
      wilayah: 'Kota Kediri', kecamatan: 'Mojoroto', kelurahan: 'Sukorame',
      kampus: 'Universitas Nusantara PGRI Kediri', fakultas: 'FKIP', jurusan: 'Pendidikan Bahasa Indonesia', angkatan: 2008, tahunLulus: 2012, ipk: 3.65,
      komisariat: 'UNP Kediri', jabatanTertinggi: 'Ketua Rayon',
      pekerjaanUtama: 'Guru/Pengajar', jabatan: 'Guru Senior', instansi: 'SMA Negeri 1 Kediri',
      statusVerifikasi: 'verified', dataLengkap: true, statusKader: 'Murabbi',
      statusMapaba: true, statusPkd: true, statusPkl: true, statusPkn: false,
    },
    {
      nia: 'IKA-003', namaLengkap: 'Muhammad Ridwan Hakim', tempatLahir: 'Blitar', tanggalLahir: new Date('1988-11-05'),
      jenisKelamin: 'L', noHp: '081234567003', email: 'ridwan.hakim@gmail.com',
      wilayah: 'Kota Kediri', kecamatan: 'Mojoroto', kelurahan: 'Campurejo',
      kampus: 'Universitas Islam Kadiri', fakultas: 'Ekonomi', jurusan: 'Manajemen', angkatan: 2006, tahunLulus: 2010, ipk: 3.45,
      komisariat: 'UNISKA Kediri', jabatanTertinggi: 'Ketua Komisariat',
      pekerjaanUtama: 'Wiraswasta', jabatan: 'Direktur', instansi: 'CV Berkah Mandiri',
      statusVerifikasi: 'verified', dataLengkap: true, statusKader: 'Muharrik',
      statusMapaba: true, statusPkd: true, statusPkl: false, statusPkn: false,
    },
    {
      nia: 'IKA-004', namaLengkap: 'Dewi Rahmawati', tempatLahir: 'Kediri', tanggalLahir: new Date('1992-05-18'),
      jenisKelamin: 'P', noHp: '081234567004', email: 'dewi.rahmawati@gmail.com',
      wilayah: 'Kota Kediri', kecamatan: 'Mojoroto', kelurahan: 'Bujel',
      kampus: 'IAIN Kediri', fakultas: 'Tarbiyah', jurusan: 'Pendidikan Agama Islam', angkatan: 2010, tahunLulus: 2014, ipk: 3.80,
      komisariat: 'IAIN Kediri', jabatanTertinggi: 'Sekretaris Cabang',
      pekerjaanUtama: 'Dosen', jabatan: 'Dosen Tetap', instansi: 'IAIN Kediri',
      statusVerifikasi: 'verified', dataLengkap: true, statusKader: 'Murabbi',
      statusMapaba: true, statusPkd: true, statusPkl: true, statusPkn: true,
    },
    {
      nia: 'IKA-005', namaLengkap: 'Hendra Prasetyo', tempatLahir: 'Nganjuk', tanggalLahir: new Date('1987-09-30'),
      jenisKelamin: 'L', noHp: '081234567005', email: 'hendra.prasetyo@gmail.com',
      wilayah: 'Kota Kediri', kecamatan: 'Mojoroto', kelurahan: 'Lirboyo',
      kampus: 'Universitas Brawijaya', fakultas: 'Hukum', jurusan: 'Ilmu Hukum', angkatan: 2005, tahunLulus: 2009, ipk: 3.55,
      komisariat: 'PMII Malang', jabatanTertinggi: 'Bendahara Cabang',
      pekerjaanUtama: 'PNS', jabatan: 'Kepala Seksi', instansi: 'Pemkot Kediri',
      statusVerifikasi: 'verified', dataLengkap: true, statusKader: 'Muharrik',
      statusMapaba: true, statusPkd: true, statusPkl: true, statusPkn: false,
    },
    {
      nia: 'IKA-006', namaLengkap: 'Nurul Hidayah', tempatLahir: 'Kediri', tanggalLahir: new Date('1993-02-14'),
      jenisKelamin: 'P', noHp: '081234567006',
      wilayah: 'Kota Kediri', kecamatan: 'Mojoroto', kelurahan: 'Dermo',
      kampus: 'Universitas Nusantara PGRI Kediri', jurusan: 'Akuntansi', angkatan: 2011,
      komisariat: 'UNP Kediri',
      pekerjaanUtama: 'Wiraswasta',
      statusVerifikasi: 'pending', dataLengkap: false, statusKader: 'Mubtadi',
      statusMapaba: true, statusPkd: false, statusPkl: false, statusPkn: false,
    },
    {
      nia: 'IKA-007', namaLengkap: 'Agus Santoso Wibowo', tempatLahir: 'Kediri', tanggalLahir: new Date('1984-06-28'),
      jenisKelamin: 'L', noHp: '081234567007', email: 'agus.santoso@gmail.com',
      wilayah: 'Kota Kediri', kecamatan: 'Mojoroto', kelurahan: 'Bandar Kidul',
      kampus: 'UIN Malang', fakultas: 'Syariah', jurusan: 'Hukum Keluarga Islam', angkatan: 2002, tahunLulus: 2006, ipk: 3.62,
      komisariat: 'UIN Malang', jabatanTertinggi: 'Ketua Komisariat',
      pekerjaanUtama: 'Politisi', jabatan: 'Anggota DPRD', instansi: 'DPRD Kota Kediri',
      statusVerifikasi: 'verified', dataLengkap: true, statusKader: 'Muharrik',
      statusMapaba: true, statusPkd: true, statusPkl: true, statusPkn: true,
    },
    {
      nia: 'IKA-008', namaLengkap: 'Rina Kusumawati', tempatLahir: 'Tulungagung', tanggalLahir: new Date('1991-12-03'),
      jenisKelamin: 'P', noHp: '081234567008',
      wilayah: 'Kota Kediri', kecamatan: 'Mojoroto', kelurahan: 'Ngampel',
      kampus: 'IAIN Kediri', jurusan: 'Komunikasi Penyiaran Islam', angkatan: 2009,
      komisariat: 'IAIN Kediri',
      pekerjaanUtama: 'Guru/Pengajar',
      statusVerifikasi: 'pending', dataLengkap: false, statusKader: 'Mubtadi',
      statusMapaba: true, statusPkd: true, statusPkl: false, statusPkn: false,
    },
    {
      nia: 'IKA-009', namaLengkap: 'Fajar Nugroho', tempatLahir: 'Kediri', tanggalLahir: new Date('1989-04-11'),
      jenisKelamin: 'L', noHp: '081234567009', email: 'fajar.nugroho@gmail.com',
      wilayah: 'Kota Kediri', kecamatan: 'Mojoroto', kelurahan: 'Pojok',
      kampus: 'Universitas Islam Kadiri', fakultas: 'Teknik', jurusan: 'Teknik Informatika', angkatan: 2007, tahunLulus: 2011, ipk: 3.50,
      komisariat: 'UNISKA Kediri', jabatanTertinggi: 'Sekretaris Komisariat',
      pekerjaanUtama: 'Wiraswasta', jabatan: 'CEO', instansi: 'PT Digital Nusantara',
      statusVerifikasi: 'verified', dataLengkap: true, statusKader: 'Murabbi',
      statusMapaba: true, statusPkd: true, statusPkl: false, statusPkn: false,
    },
    {
      nia: 'IKA-010', namaLengkap: 'Laila Fitri Handayani', tempatLahir: 'Kediri', tanggalLahir: new Date('1994-08-19'),
      jenisKelamin: 'P', noHp: '081234567010',
      wilayah: 'Kota Kediri', kecamatan: 'Mojoroto', kelurahan: 'Jamsaren',
      kampus: 'IAIN Kediri', jurusan: 'Perbankan Syariah', angkatan: 2012,
      komisariat: 'IAIN Kediri',
      pekerjaanUtama: 'Karyawan Swasta',
      statusVerifikasi: 'pending', dataLengkap: false, statusKader: 'Mubtadi',
      statusMapaba: true, statusPkd: false, statusPkl: false, statusPkn: false,
    },
    // Kota Kediri - Kota (20 alumni)
    {
      nia: 'IKA-011', namaLengkap: 'Bambang Sutrisno', tempatLahir: 'Kediri', tanggalLahir: new Date('1983-01-25'),
      jenisKelamin: 'L', noHp: '081234567011', email: 'bambang.sutrisno@gmail.com',
      wilayah: 'Kota Kediri', kecamatan: 'Kota', kelurahan: 'Pakelan',
      kampus: 'UGM', fakultas: 'Fisipol', jurusan: 'Ilmu Politik', angkatan: 2001, tahunLulus: 2005, ipk: 3.68,
      komisariat: 'PMII Jogja', jabatanTertinggi: 'Ketua Cabang',
      pekerjaanUtama: 'Politisi', jabatan: 'Anggota DPRD Provinsi', instansi: 'DPRD Jawa Timur',
      statusVerifikasi: 'verified', dataLengkap: true, statusKader: 'Muharrik',
      statusMapaba: true, statusPkd: true, statusPkl: true, statusPkn: true,
    },
    {
      nia: 'IKA-012', namaLengkap: 'Sri Wahyuni', tempatLahir: 'Kediri', tanggalLahir: new Date('1990-10-07'),
      jenisKelamin: 'P', noHp: '081234567012', email: 'sri.wahyuni@gmail.com',
      wilayah: 'Kota Kediri', kecamatan: 'Kota', kelurahan: 'Setono Betek',
      kampus: 'Universitas Nusantara PGRI Kediri', fakultas: 'FKIP', jurusan: 'Pendidikan Matematika', angkatan: 2008, tahunLulus: 2012, ipk: 3.74,
      komisariat: 'UNP Kediri', jabatanTertinggi: 'Bendahara Rayon',
      pekerjaanUtama: 'Guru/Pengajar', jabatan: 'Guru Matematika', instansi: 'SMP Negeri 4 Kediri',
      statusVerifikasi: 'verified', dataLengkap: true, statusKader: 'Murabbi',
      statusMapaba: true, statusPkd: true, statusPkl: false, statusPkn: false,
    },
    {
      nia: 'IKA-013', namaLengkap: 'Rizal Maulana Akbar', tempatLahir: 'Jombang', tanggalLahir: new Date('1986-07-14'),
      jenisKelamin: 'L', noHp: '081234567013', email: 'rizal.maulana@gmail.com',
      wilayah: 'Kota Kediri', kecamatan: 'Kota', kelurahan: 'Ngadirejo',
      kampus: 'IAIN Kediri', fakultas: 'Ekonomi Islam', jurusan: 'Ekonomi Syariah', angkatan: 2004, tahunLulus: 2008, ipk: 3.60,
      komisariat: 'IAIN Kediri', jabatanTertinggi: 'Ketua Cabang',
      pekerjaanUtama: 'Dosen', jabatan: 'Dosen', instansi: 'Universitas Islam Kadiri',
      statusVerifikasi: 'verified', dataLengkap: true, statusKader: 'Muharrik',
      statusMapaba: true, statusPkd: true, statusPkl: true, statusPkn: true,
    },
    {
      nia: 'IKA-014', namaLengkap: 'Fitriani Rahayu', tempatLahir: 'Kediri', tanggalLahir: new Date('1995-03-27'),
      jenisKelamin: 'P', noHp: '081234567014',
      wilayah: 'Kota Kediri', kecamatan: 'Kota', kelurahan: 'Kemasan',
      kampus: 'Universitas Brawijaya', jurusan: 'Akuntansi', angkatan: 2013,
      komisariat: 'PMII Malang',
      pekerjaanUtama: 'Karyawan Swasta',
      statusVerifikasi: 'pending', dataLengkap: false, statusKader: 'Mubtadi',
      statusMapaba: true, statusPkd: false, statusPkl: false, statusPkn: false,
    },
    {
      nia: 'IKA-015', namaLengkap: 'Dian Purnama Sari', tempatLahir: 'Kediri', tanggalLahir: new Date('1988-11-20'),
      jenisKelamin: 'P', noHp: '081234567015', email: 'dian.purnama@gmail.com',
      wilayah: 'Kota Kediri', kecamatan: 'Kota', kelurahan: 'Dandangan',
      kampus: 'Universitas Islam Kadiri', fakultas: 'Hukum', jurusan: 'Ilmu Hukum', angkatan: 2006, tahunLulus: 2010, ipk: 3.55,
      komisariat: 'UNISKA Kediri', jabatanTertinggi: 'Ketua Komisariat',
      pekerjaanUtama: 'Advokat/Pengacara', jabatan: 'Advokat', instansi: 'Kantor Hukum Kediri',
      statusVerifikasi: 'verified', dataLengkap: true, statusKader: 'Murabbi',
      statusMapaba: true, statusPkd: true, statusPkl: true, statusPkn: false,
    },
    // Kota Kediri - Pesantren (18 alumni)
    {
      nia: 'IKA-016', namaLengkap: 'Abdullah Hasyim', tempatLahir: 'Kediri', tanggalLahir: new Date('1982-05-12'),
      jenisKelamin: 'L', noHp: '081234567016', email: 'abdullah.hasyim@gmail.com',
      wilayah: 'Kota Kediri', kecamatan: 'Pesantren', kelurahan: 'Pesantren',
      kampus: 'IAIN Kediri', fakultas: 'Ushuluddin', jurusan: 'Tafsir Hadist', angkatan: 2000, tahunLulus: 2004, ipk: 3.85,
      komisariat: 'IAIN Kediri', jabatanTertinggi: 'Ketua Cabang',
      pekerjaanUtama: 'Ulama/Pengasuh Pesantren', jabatan: 'Pengasuh', instansi: 'Pesantren Al-Hidayah Kediri',
      statusVerifikasi: 'verified', dataLengkap: true, statusKader: 'Muharrik',
      statusMapaba: true, statusPkd: true, statusPkl: true, statusPkn: true,
    },
    {
      nia: 'IKA-017', namaLengkap: 'Yuliana Safitri', tempatLahir: 'Kediri', tanggalLahir: new Date('1991-09-16'),
      jenisKelamin: 'P', noHp: '081234567017', email: 'yuliana.safitri@gmail.com',
      wilayah: 'Kota Kediri', kecamatan: 'Pesantren', kelurahan: 'Bawang',
      kampus: 'Universitas Nusantara PGRI Kediri', fakultas: 'Ekonomi', jurusan: 'Manajemen', angkatan: 2009, tahunLulus: 2013, ipk: 3.42,
      komisariat: 'UNP Kediri', jabatanTertinggi: 'Sekretaris Cabang',
      pekerjaanUtama: 'PNS', jabatan: 'Staf Administrasi', instansi: 'Dinas Pendidikan Kota Kediri',
      statusVerifikasi: 'verified', dataLengkap: true, statusKader: 'Murabbi',
      statusMapaba: true, statusPkd: true, statusPkl: false, statusPkn: false,
    },
    {
      nia: 'IKA-018', namaLengkap: 'Moh. Iqbal Firdaus', tempatLahir: 'Malang', tanggalLahir: new Date('1987-12-08'),
      jenisKelamin: 'L', noHp: '081234567018', email: 'iqbal.firdaus@gmail.com',
      wilayah: 'Kota Kediri', kecamatan: 'Pesantren', kelurahan: 'Singonegaran',
      kampus: 'UIN Malang', fakultas: 'Ekonomi', jurusan: 'Perbankan Syariah', angkatan: 2005, tahunLulus: 2009, ipk: 3.70,
      komisariat: 'UIN Malang', jabatanTertinggi: 'Ketua Komisariat',
      pekerjaanUtama: 'Karyawan Swasta', jabatan: 'Manager', instansi: 'Bank BRI Syariah Kediri',
      statusVerifikasi: 'verified', dataLengkap: true, statusKader: 'Muharrik',
      statusMapaba: true, statusPkd: true, statusPkl: true, statusPkn: false,
    },
    {
      nia: 'IKA-019', namaLengkap: 'Putri Ayu Lestari', tempatLahir: 'Kediri', tanggalLahir: new Date('1994-06-25'),
      jenisKelamin: 'P', noHp: '081234567019',
      wilayah: 'Kota Kediri', kecamatan: 'Pesantren', kelurahan: 'Ketami',
      kampus: 'IAIN Kediri', jurusan: 'Hukum Tata Negara', angkatan: 2012,
      komisariat: 'IAIN Kediri',
      statusVerifikasi: 'pending', dataLengkap: false, statusKader: 'Mubtadi',
      statusMapaba: true, statusPkd: false, statusPkl: false, statusPkn: false,
    },
    {
      nia: 'IKA-020', namaLengkap: 'Khoirul Anam', tempatLahir: 'Kediri', tanggalLahir: new Date('1985-08-03'),
      jenisKelamin: 'L', noHp: '081234567020', email: 'khoirul.anam@gmail.com',
      wilayah: 'Kota Kediri', kecamatan: 'Pesantren', kelurahan: 'Burengan',
      kampus: 'IAIN Kediri', fakultas: 'Tarbiyah', jurusan: 'Manajemen Pendidikan Islam', angkatan: 2003, tahunLulus: 2007, ipk: 3.60,
      komisariat: 'IAIN Kediri', jabatanTertinggi: 'Bendahara Cabang',
      pekerjaanUtama: 'Guru/Pengajar', jabatan: 'Kepala Sekolah', instansi: 'MI Hidayatul Mubtadiin Kediri',
      statusVerifikasi: 'verified', dataLengkap: true, statusKader: 'Murabbi',
      statusMapaba: true, statusPkd: true, statusPkl: true, statusPkn: false,
    },
    // Kab Kediri - Pare
    {
      nia: 'IKA-021', namaLengkap: 'Imam Wahyudi', tempatLahir: 'Kediri', tanggalLahir: new Date('1986-04-19'),
      jenisKelamin: 'L', noHp: '081234567021', email: 'imam.wahyudi@gmail.com',
      wilayah: 'Kab. Kediri', kecamatan: 'Pare', kelurahan: 'Tulungrejo',
      kampus: 'Universitas Nusantara PGRI Kediri', fakultas: 'FKIP', jurusan: 'Pendidikan Bahasa Inggris', angkatan: 2004, tahunLulus: 2008, ipk: 3.48,
      komisariat: 'UNP Kediri', jabatanTertinggi: 'Ketua Rayon',
      pekerjaanUtama: 'Wiraswasta', jabatan: 'Pemilik', instansi: 'Lembaga Kursus Bahasa Inggris',
      statusVerifikasi: 'verified', dataLengkap: true, statusKader: 'Murabbi',
      statusMapaba: true, statusPkd: true, statusPkl: false, statusPkn: false,
    },
    {
      nia: 'IKA-022', namaLengkap: 'Sulastri Dewi', tempatLahir: 'Kediri', tanggalLahir: new Date('1992-01-30'),
      jenisKelamin: 'P', noHp: '081234567022',
      wilayah: 'Kab. Kediri', kecamatan: 'Pare', kelurahan: 'Pare',
      kampus: 'IAIN Kediri', jurusan: 'Ekonomi Islam', angkatan: 2010,
      komisariat: 'IAIN Kediri',
      pekerjaanUtama: 'Petani',
      statusVerifikasi: 'pending', dataLengkap: false, statusKader: 'Mubtadi',
      statusMapaba: true, statusPkd: false, statusPkl: false, statusPkn: false,
    },
    {
      nia: 'IKA-023', namaLengkap: 'Zainal Abidin', tempatLahir: 'Kediri', tanggalLahir: new Date('1983-10-22'),
      jenisKelamin: 'L', noHp: '081234567023', email: 'zainal.abidin@gmail.com',
      wilayah: 'Kab. Kediri', kecamatan: 'Pare', kelurahan: 'Sumberbendo',
      kampus: 'UGM', fakultas: 'Pertanian', jurusan: 'Agribisnis', angkatan: 2001, tahunLulus: 2005, ipk: 3.40,
      komisariat: 'PMII Jogja', jabatanTertinggi: 'Sekretaris Komisariat',
      pekerjaanUtama: 'PNS', jabatan: 'Penyuluh Pertanian', instansi: 'Dinas Pertanian Kab. Kediri',
      statusVerifikasi: 'verified', dataLengkap: true, statusKader: 'Muharrik',
      statusMapaba: true, statusPkd: true, statusPkl: true, statusPkn: false,
    },
    // Kab Kediri - Ngasem
    {
      nia: 'IKA-024', namaLengkap: 'Wahid Hasyim Prasetya', tempatLahir: 'Kediri', tanggalLahir: new Date('1989-07-08'),
      jenisKelamin: 'L', noHp: '081234567024', email: 'wahid.hasyim@gmail.com',
      wilayah: 'Kab. Kediri', kecamatan: 'Ngasem', kelurahan: 'Ngasem',
      kampus: 'Universitas Islam Kadiri', fakultas: 'Ekonomi', jurusan: 'Akuntansi', angkatan: 2007, tahunLulus: 2011, ipk: 3.52,
      komisariat: 'UNISKA Kediri', jabatanTertinggi: 'Bendahara Cabang',
      pekerjaanUtama: 'Karyawan Swasta', jabatan: 'Akuntan', instansi: 'PT Gudang Garam Tbk',
      statusVerifikasi: 'verified', dataLengkap: true, statusKader: 'Murabbi',
      statusMapaba: true, statusPkd: true, statusPkl: false, statusPkn: false,
    },
    {
      nia: 'IKA-025', namaLengkap: 'Ika Susilawati', tempatLahir: 'Kediri', tanggalLahir: new Date('1993-04-15'),
      jenisKelamin: 'P', noHp: '081234567025',
      wilayah: 'Kab. Kediri', kecamatan: 'Ngasem', kelurahan: 'Sumberejo',
      kampus: 'IAIN Kediri', jurusan: 'Tasawuf Psikoterapi', angkatan: 2011,
      komisariat: 'IAIN Kediri',
      statusVerifikasi: 'pending', dataLengkap: false, statusKader: 'Mubtadi',
      statusMapaba: true, statusPkd: false, statusPkl: false, statusPkn: false,
    },
    // Kab Kediri - Gurah
    {
      nia: 'IKA-026', namaLengkap: 'Miftahul Huda', tempatLahir: 'Kediri', tanggalLahir: new Date('1981-11-17'),
      jenisKelamin: 'L', noHp: '081234567026', email: 'miftahul.huda@gmail.com',
      wilayah: 'Kab. Kediri', kecamatan: 'Gurah', kelurahan: 'Gurah',
      kampus: 'IAIN Kediri', fakultas: 'Dakwah', jurusan: 'Komunikasi Penyiaran Islam', angkatan: 1999, tahunLulus: 2003, ipk: 3.30,
      komisariat: 'IAIN Kediri', jabatanTertinggi: 'Ketua Cabang',
      pekerjaanUtama: 'Guru/Pengajar', jabatan: 'Pengasuh Pondok', instansi: 'Pondok Pesantren Gurah',
      statusVerifikasi: 'verified', dataLengkap: true, statusKader: 'Muharrik',
      statusMapaba: true, statusPkd: true, statusPkl: true, statusPkn: true,
    },
    {
      nia: 'IKA-027', namaLengkap: 'Novita Sari', tempatLahir: 'Blitar', tanggalLahir: new Date('1994-09-02'),
      jenisKelamin: 'P', noHp: '081234567027',
      wilayah: 'Kab. Kediri', kecamatan: 'Gurah', kelurahan: 'Sumber Mulyo',
      kampus: 'Universitas Nusantara PGRI Kediri', jurusan: 'Bimbingan Konseling', angkatan: 2012,
      komisariat: 'UNP Kediri',
      statusVerifikasi: 'pending', dataLengkap: false, statusKader: 'Mubtadi',
      statusMapaba: true, statusPkd: false, statusPkl: false, statusPkn: false,
    },
    // Kab Kediri - Gampengrejo
    {
      nia: 'IKA-028', namaLengkap: 'Syaifuddin Zuhri', tempatLahir: 'Kediri', tanggalLahir: new Date('1984-02-27'),
      jenisKelamin: 'L', noHp: '081234567028', email: 'syaifuddin.zuhri@gmail.com',
      wilayah: 'Kab. Kediri', kecamatan: 'Gampengrejo', kelurahan: 'Gampengrejo',
      kampus: 'UIN Malang', fakultas: 'Tarbiyah', jurusan: 'Pendidikan Agama Islam', angkatan: 2002, tahunLulus: 2006, ipk: 3.65,
      komisariat: 'UIN Malang', jabatanTertinggi: 'Ketua Cabang',
      pekerjaanUtama: 'Dosen', jabatan: 'Dosen', instansi: 'UIN Malang',
      statusVerifikasi: 'verified', dataLengkap: true, statusKader: 'Muharrik',
      statusMapaba: true, statusPkd: true, statusPkl: true, statusPkn: true,
    },
    {
      nia: 'IKA-029', namaLengkap: 'Rini Astuti', tempatLahir: 'Kediri', tanggalLahir: new Date('1990-06-11'),
      jenisKelamin: 'P', noHp: '081234567029',
      wilayah: 'Kab. Kediri', kecamatan: 'Gampengrejo', kelurahan: 'Sambi',
      kampus: 'IAIN Kediri', jurusan: 'Manajemen Zakat Wakaf', angkatan: 2008,
      komisariat: 'IAIN Kediri',
      pekerjaanUtama: 'Karyawan Swasta',
      statusVerifikasi: 'pending', dataLengkap: false, statusKader: 'Mubtadi',
      statusMapaba: true, statusPkd: true, statusPkl: false, statusPkn: false,
    },
    // Kab Kediri - Wates
    {
      nia: 'IKA-030', namaLengkap: 'Hariyanto Basuki', tempatLahir: 'Kediri', tanggalLahir: new Date('1980-12-05'),
      jenisKelamin: 'L', noHp: '081234567030', email: 'hariyanto.basuki@gmail.com',
      wilayah: 'Kab. Kediri', kecamatan: 'Wates', kelurahan: 'Wates',
      kampus: 'Universitas Brawijaya', fakultas: 'MIPA', jurusan: 'Matematika', angkatan: 1998, tahunLulus: 2002, ipk: 3.35,
      komisariat: 'PMII Malang', jabatanTertinggi: 'Ketua Rayon',
      pekerjaanUtama: 'Petani', jabatan: 'Ketua Kelompok Tani', instansi: 'Kelompok Tani Makmur Wates',
      statusVerifikasi: 'verified', dataLengkap: true, statusKader: 'Murabbi',
      statusMapaba: true, statusPkd: true, statusPkl: false, statusPkn: false,
    },
    // Kab Kediri - Puncu
    {
      nia: 'IKA-031', namaLengkap: 'Slamet Riyadi', tempatLahir: 'Kediri', tanggalLahir: new Date('1986-03-18'),
      jenisKelamin: 'L', noHp: '081234567031', email: 'slamet.riyadi@gmail.com',
      wilayah: 'Kab. Kediri', kecamatan: 'Puncu', kelurahan: 'Puncu',
      kampus: 'Universitas Islam Kadiri', fakultas: 'Pertanian', jurusan: 'Agroteknologi', angkatan: 2004, tahunLulus: 2008, ipk: 3.28,
      komisariat: 'UNISKA Kediri', jabatanTertinggi: 'Bendahara Komisariat',
      pekerjaanUtama: 'Petani', jabatan: 'Petani Mandiri', instansi: 'Kebun Kopi Puncu',
      statusVerifikasi: 'verified', dataLengkap: true, statusKader: 'Mubtadi',
      statusMapaba: true, statusPkd: false, statusPkl: false, statusPkn: false,
    },
    // Kab Kediri - Plosoklaten
    {
      nia: 'IKA-032', namaLengkap: 'Endang Suryani', tempatLahir: 'Kediri', tanggalLahir: new Date('1988-08-14'),
      jenisKelamin: 'P', noHp: '081234567032', email: 'endang.suryani@gmail.com',
      wilayah: 'Kab. Kediri', kecamatan: 'Plosoklaten', kelurahan: 'Plosoklaten',
      kampus: 'IAIN Kediri', fakultas: 'Tarbiyah', jurusan: 'PGMI', angkatan: 2006, tahunLulus: 2010, ipk: 3.55,
      komisariat: 'IAIN Kediri', jabatanTertinggi: 'Sekretaris Rayon',
      pekerjaanUtama: 'Guru/Pengajar', jabatan: 'Guru Kelas', instansi: 'MI Miftahul Ulum',
      statusVerifikasi: 'verified', dataLengkap: true, statusKader: 'Murabbi',
      statusMapaba: true, statusPkd: true, statusPkl: false, statusPkn: false,
    },
    // Additional alumni for variety
    {
      nia: 'IKA-033', namaLengkap: 'Taufik Hidayat', tempatLahir: 'Kediri', tanggalLahir: new Date('1991-05-21'),
      jenisKelamin: 'L', noHp: '081234567033',
      wilayah: 'Kab. Kediri', kecamatan: 'Kandangan', kelurahan: 'Kandangan',
      kampus: 'Universitas Nusantara PGRI Kediri', jurusan: 'Teknik Mesin', angkatan: 2009,
      komisariat: 'UNP Kediri',
      pekerjaanUtama: 'Wiraswasta',
      statusVerifikasi: 'pending', dataLengkap: false, statusKader: 'Mubtadi',
      statusMapaba: true, statusPkd: false, statusPkl: false, statusPkn: false,
    },
    {
      nia: 'IKA-034', namaLengkap: 'Mariyam Ulfa', tempatLahir: 'Kediri', tanggalLahir: new Date('1987-10-09'),
      jenisKelamin: 'P', noHp: '081234567034', email: 'mariyam.ulfa@gmail.com',
      wilayah: 'Kab. Kediri', kecamatan: 'Kepung', kelurahan: 'Kepung',
      kampus: 'UGM', fakultas: 'Kedokteran', jurusan: 'Ilmu Keperawatan', angkatan: 2005, tahunLulus: 2009, ipk: 3.60,
      komisariat: 'PMII Jogja', jabatanTertinggi: 'Ketua Komisariat',
      pekerjaanUtama: 'Tenaga Kesehatan', jabatan: 'Perawat Senior', instansi: 'RSUD Gambiran Kediri',
      statusVerifikasi: 'verified', dataLengkap: true, statusKader: 'Muharrik',
      statusMapaba: true, statusPkd: true, statusPkl: true, statusPkn: false,
    },
    {
      nia: 'IKA-035', namaLengkap: 'Lukman Hakim', tempatLahir: 'Kediri', tanggalLahir: new Date('1980-01-03'),
      jenisKelamin: 'L', noHp: '081234567035', email: 'lukman.hakim@gmail.com',
      wilayah: 'Kab. Kediri', kecamatan: 'Badas', kelurahan: 'Badas',
      kampus: 'IAIN Kediri', fakultas: 'Syariah', jurusan: 'Hukum Ekonomi Islam', angkatan: 1998, tahunLulus: 2002, ipk: 3.45,
      komisariat: 'IAIN Kediri', jabatanTertinggi: 'Ketua Cabang',
      pekerjaanUtama: 'Wiraswasta', jabatan: 'Pengusaha', instansi: 'UD Hakim Jaya',
      statusVerifikasi: 'verified', dataLengkap: true, statusKader: 'Muharrik',
      statusMapaba: true, statusPkd: true, statusPkl: true, statusPkn: true,
    },
  ];

  for (const data of alumniData) {
    await prisma.alumni.upsert({
      where: { nia: data.nia },
      update: {},
      create: data,
    });
  }
  console.log(`${alumniData.length} alumni created`);

  // Kegiatan
  const kegiatan1 = await prisma.kegiatan.create({
    data: {
      judul: 'Reuni Akbar IKA-PMII Kediri 2024',
      deskripsi: 'Reuni akbar seluruh alumni PMII se-Kediri Raya dalam rangka mempererat silaturahmi dan sinergi pembangunan daerah.',
      tanggal: new Date('2024-12-15'),
      waktu: '08:00',
      lokasi: 'Gedung Olah Raga Kediri',
      kategori: 'Reuni',
      kuota: 1000,
      pemateri: 'Pengurus IKA-PMII Pusat',
      status: 'selesai',
      anggaran: 50000000,
    },
  });
  const kegiatan2 = await prisma.kegiatan.create({
    data: {
      judul: 'Seminar Nasional: Islam, Kebangsaan & Kepemudaan',
      deskripsi: 'Seminar nasional membahas peran pemuda Islam dalam menjaga persatuan dan mendorong kemajuan bangsa.',
      tanggal: new Date('2025-03-22'),
      waktu: '09:00',
      lokasi: 'Aula IAIN Kediri',
      kategori: 'Seminar',
      kuota: 300,
      pemateri: 'Prof. Dr. H. Ahmad Fauzi, M.Ag.',
      status: 'selesai',
      anggaran: 15000000,
    },
  });
  const kegiatan3 = await prisma.kegiatan.create({
    data: {
      judul: 'Pelatihan Kewirausahaan Alumni',
      deskripsi: 'Pelatihan kewirausahaan bagi alumni untuk meningkatkan kompetensi bisnis dan networking antar alumni.',
      tanggal: new Date('2025-07-10'),
      waktu: '08:00',
      lokasi: 'Hotel Penataran Kediri',
      kategori: 'Pelatihan',
      kuota: 100,
      pemateri: 'Tim Wirausaha Muda Kediri',
      status: 'mendatang',
      anggaran: 20000000,
    },
  });
  const kegiatan4 = await prisma.kegiatan.create({
    data: {
      judul: 'Bakti Sosial & Donor Darah',
      deskripsi: 'Kegiatan bakti sosial berupa donor darah, pembagian sembako, dan santunan anak yatim se-Kediri Raya.',
      tanggal: new Date('2025-08-17'),
      waktu: '07:00',
      lokasi: 'Alun-alun Kota Kediri',
      kategori: 'Sosial',
      kuota: 500,
      pemateri: null,
      status: 'mendatang',
      anggaran: 30000000,
    },
  });
  console.log('4 kegiatan created');

  // Get first 5 alumni IDs for registrations
  const alumniList = await prisma.alumni.findMany({ take: 5, select: { id: true } });

  const registrasiItems = [
    { alumniId: alumniList[0].id, kegiatanId: kegiatan1.id, statusReg: 'terdaftar', hadir: true },
    { alumniId: alumniList[1].id, kegiatanId: kegiatan1.id, statusReg: 'terdaftar', hadir: true },
    { alumniId: alumniList[2].id, kegiatanId: kegiatan1.id, statusReg: 'terdaftar', hadir: false },
    { alumniId: alumniList[0].id, kegiatanId: kegiatan2.id, statusReg: 'terdaftar', hadir: true },
    { alumniId: alumniList[3].id, kegiatanId: kegiatan2.id, statusReg: 'terdaftar', hadir: true },
    { alumniId: alumniList[1].id, kegiatanId: kegiatan3.id, statusReg: 'terdaftar', hadir: false },
    { alumniId: alumniList[4].id, kegiatanId: kegiatan3.id, statusReg: 'terdaftar', hadir: false },
  ];
  for (const item of registrasiItems) {
    await prisma.registrasiKegiatan.upsert({
      where: { alumniId_kegiatanId: { alumniId: item.alumniId, kegiatanId: item.kegiatanId } },
      update: {},
      create: item,
    });
  }
  console.log('Registrasi kegiatan created');

  // Program Donasi
  const program1 = await prisma.programDonasi.create({
    data: {
      judul: 'Dana Operasional Sekretariat',
      deskripsi: 'Pengumpulan dana untuk operasional sekretariat IKA-PMII Kediri termasuk listrik, internet, ATK, dan keperluan administrasi.',
      target: 50000000,
      terkumpul: 32500000,
      deadline: new Date('2025-12-31'),
      status: 'aktif',
      icon: 'building',
    },
  });
  const program2 = await prisma.programDonasi.create({
    data: {
      judul: 'Beasiswa Kader Berprestasi',
      deskripsi: 'Program beasiswa untuk kader PMII aktif yang berprestasi namun memiliki keterbatasan ekonomi.',
      target: 100000000,
      terkumpul: 45000000,
      deadline: new Date('2025-08-31'),
      status: 'aktif',
      icon: 'graduation-cap',
    },
  });
  const program3 = await prisma.programDonasi.create({
    data: {
      judul: 'Renovasi Masjid Kampus',
      deskripsi: 'Penggalangan dana untuk renovasi masjid kampus IAIN Kediri sebagai pusat kegiatan keislaman mahasiswa.',
      target: 200000000,
      terkumpul: 78000000,
      deadline: new Date('2025-06-30'),
      status: 'aktif',
      icon: 'mosque',
    },
  });
  console.log('3 program donasi created');

  // Transaksi Donasi
  const transaksiData = [
    { programId: program1.id, alumniId: alumniList[0].id, namaDonatur: 'Ahmad Fauzi Rachman', nominal: 2000000, metode: 'Transfer Bank', status: 'berhasil' },
    { programId: program1.id, alumniId: alumniList[1].id, namaDonatur: 'Siti Fatimah Zahra', nominal: 500000, metode: 'QRIS', status: 'berhasil' },
    { programId: program1.id, alumniId: null, namaDonatur: 'Hamba Allah', nominal: 1000000, metode: 'Transfer Bank', status: 'berhasil' },
    { programId: program1.id, alumniId: alumniList[2].id, namaDonatur: 'Muhammad Ridwan Hakim', nominal: 1500000, metode: 'Transfer Bank', status: 'berhasil' },
    { programId: program2.id, alumniId: alumniList[0].id, namaDonatur: 'Ahmad Fauzi Rachman', nominal: 5000000, metode: 'Transfer Bank', status: 'berhasil' },
    { programId: program2.id, alumniId: alumniList[3].id, namaDonatur: 'Dewi Rahmawati', nominal: 2500000, metode: 'QRIS', status: 'berhasil' },
    { programId: program2.id, alumniId: null, namaDonatur: 'Donatur Anonim', nominal: 3000000, metode: 'Transfer Bank', status: 'berhasil' },
    { programId: program2.id, alumniId: alumniList[4].id, namaDonatur: 'Hendra Prasetyo', nominal: 1000000, metode: 'Tunai', status: 'berhasil' },
    { programId: program3.id, alumniId: alumniList[1].id, namaDonatur: 'Siti Fatimah Zahra', nominal: 3000000, metode: 'Transfer Bank', status: 'berhasil' },
    { programId: program3.id, alumniId: null, namaDonatur: 'Keluarga Besar Alumni 2005', nominal: 10000000, metode: 'Transfer Bank', status: 'berhasil' },
    { programId: program3.id, alumniId: alumniList[2].id, namaDonatur: 'Muhammad Ridwan Hakim', nominal: 5000000, metode: 'Transfer Bank', status: 'pending' },
    { programId: program1.id, alumniId: null, namaDonatur: 'Donatur Baru', nominal: 750000, metode: 'QRIS', status: 'pending' },
  ];

  for (const item of transaksiData) {
    await prisma.transaksiDonasi.create({ data: item });
  }
  console.log('12 transaksi donasi created');

  console.log('\nSeeding complete!');
  console.log('Admin: admin@ikapmii.id / pmii2024');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
