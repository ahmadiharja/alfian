const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const upload = require('../middleware/upload');
const prisma = require('../lib/prisma');

// GET /api/alumni/public - public list with masked sensitive fields
router.get('/public', async (req, res) => {
  try {
    const { q, wilayah, kecamatan, angkatan, pekerjaan, page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = { statusVerifikasi: 'verified', statusAktif: true };

    if (q) {
      where.OR = [
        { namaLengkap: { contains: q } },
        { kampus: { contains: q } },
        { jurusan: { contains: q } },
      ];
    }
    if (wilayah) where.wilayah = { contains: wilayah };
    if (kecamatan) where.kecamatan = { contains: kecamatan };
    if (angkatan) where.angkatan = parseInt(angkatan);
    if (pekerjaan) where.pekerjaanUtama = { contains: pekerjaan };

    const [total, data] = await Promise.all([
      prisma.alumni.count({ where }),
      prisma.alumni.findMany({
        where,
        skip,
        take: parseInt(limit),
        select: {
          id: true,
          nia: true,
          namaLengkap: true,
          jenisKelamin: true,
          foto: true,
          wilayah: true,
          kecamatan: true,
          kampus: true,
          jurusan: true,
          angkatan: true,
          pekerjaanUtama: true,
          jabatan: true,
          instansi: true,
          statusKader: true,
          jabatanTertinggi: true,
          // Masked fields
          noHp: true,
          email: true,
          nik: true,
        },
        orderBy: { namaLengkap: 'asc' },
      }),
    ]);

    // Mask sensitive fields
    const masked = data.map((a) => ({
      ...a,
      noHp: a.noHp ? a.noHp.slice(0, 4) + '****' + a.noHp.slice(-2) : null,
      email: a.email ? a.email.replace(/(.{2}).*(@.*)/, '$1***$2') : null,
      nik: a.nik ? a.nik.slice(0, 6) + '**********' : null,
    }));

    res.json({
      success: true,
      data: masked,
      meta: { total, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(total / parseInt(limit)) },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/alumni/daftar - public self-registration
router.post('/daftar', async (req, res) => {
  try {
    const {
      namaLengkap, noHp, email, wilayah, kecamatan, kelurahan,
      kampus, jurusan, angkatan, komisariat,
    } = req.body;

    if (!namaLengkap || !noHp) {
      return res.status(400).json({ success: false, message: 'Nama lengkap dan nomor HP wajib diisi' });
    }

    // Generate NIA
    const count = await prisma.alumni.count();
    const nia = `IKA-${String(count + 1001).padStart(4, '0')}`;

    const alumni = await prisma.alumni.create({
      data: {
        nia,
        namaLengkap,
        noHp,
        email,
        wilayah,
        kecamatan,
        kelurahan,
        kampus,
        jurusan,
        angkatan: angkatan ? parseInt(angkatan) : null,
        komisariat,
        statusVerifikasi: 'pending',
        statusAktif: true,
        dataLengkap: false,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Pendaftaran berhasil. Data Anda akan diverifikasi oleh admin.',
      data: { id: alumni.id, nia: alumni.nia, namaLengkap: alumni.namaLengkap },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/alumni - admin list with full data
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { q, wilayah, kecamatan, angkatan, pekerjaan, status, page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {};

    if (q) {
      where.OR = [
        { namaLengkap: { contains: q } },
        { nia: { contains: q } },
        { kampus: { contains: q } },
        { jurusan: { contains: q } },
        { email: { contains: q } },
      ];
    }
    if (wilayah) where.wilayah = { contains: wilayah };
    if (kecamatan) where.kecamatan = { contains: kecamatan };
    if (angkatan) where.angkatan = parseInt(angkatan);
    if (pekerjaan) where.pekerjaanUtama = { contains: pekerjaan };
    if (status) where.statusVerifikasi = status;

    const [total, data] = await Promise.all([
      prisma.alumni.count({ where }),
      prisma.alumni.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    res.json({
      success: true,
      data,
      meta: { total, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(total / parseInt(limit)) },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/alumni - create alumni (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const body = req.body;

    // Check NIA uniqueness
    if (body.nia) {
      const existing = await prisma.alumni.findUnique({ where: { nia: body.nia } });
      if (existing) {
        return res.status(400).json({ success: false, message: 'NIA sudah digunakan' });
      }
    } else {
      const count = await prisma.alumni.count();
      body.nia = `IKA-${String(count + 1001).padStart(4, '0')}`;
    }

    // Convert number fields
    if (body.angkatan) body.angkatan = parseInt(body.angkatan);
    if (body.tahunLulus) body.tahunLulus = parseInt(body.tahunLulus);
    if (body.ipk) body.ipk = parseFloat(body.ipk);
    if (body.jumlahAnak) body.jumlahAnak = parseInt(body.jumlahAnak);
    if (body.tanggungan) body.tanggungan = parseInt(body.tanggungan);
    if (body.tahunMapaba) body.tahunMapaba = parseInt(body.tahunMapaba);

    // Convert boolean fields
    ['sedangStudiLanjut', 'statusMapaba', 'statusPkd', 'statusPkl', 'statusPkn', 'bersediaMentor', 'statusAktif', 'dataLengkap'].forEach((f) => {
      if (body[f] !== undefined) body[f] = body[f] === true || body[f] === 'true';
    });

    if (body.tanggalLahir) body.tanggalLahir = new Date(body.tanggalLahir);

    const alumni = await prisma.alumni.create({ data: body });
    res.status(201).json({ success: true, data: alumni });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/alumni/:id - get one alumni
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const alumni = await prisma.alumni.findUnique({
      where: { id: req.params.id },
      include: {
        registrasiKegiatan: { include: { kegiatan: true } },
        transaksiDonasi: { include: { program: true } },
      },
    });

    if (!alumni) {
      return res.status(404).json({ success: false, message: 'Alumni tidak ditemukan' });
    }

    res.json({ success: true, data: alumni });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/alumni/:id - update alumni (admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const body = { ...req.body };
    delete body.id;
    delete body.createdAt;
    delete body.updatedAt;

    // Convert number fields
    if (body.angkatan) body.angkatan = parseInt(body.angkatan);
    if (body.tahunLulus) body.tahunLulus = parseInt(body.tahunLulus);
    if (body.ipk) body.ipk = parseFloat(body.ipk);
    if (body.jumlahAnak) body.jumlahAnak = parseInt(body.jumlahAnak);
    if (body.tanggungan) body.tanggungan = parseInt(body.tanggungan);
    if (body.tahunMapaba) body.tahunMapaba = parseInt(body.tahunMapaba);

    ['sedangStudiLanjut', 'statusMapaba', 'statusPkd', 'statusPkl', 'statusPkn', 'bersediaMentor', 'statusAktif', 'dataLengkap'].forEach((f) => {
      if (body[f] !== undefined) body[f] = body[f] === true || body[f] === 'true';
    });

    if (body.tanggalLahir) body.tanggalLahir = new Date(body.tanggalLahir);

    const alumni = await prisma.alumni.update({
      where: { id: req.params.id },
      data: body,
    });

    res.json({ success: true, data: alumni });
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, message: 'Alumni tidak ditemukan' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/alumni/:id - delete alumni (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.alumni.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Alumni berhasil dihapus' });
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, message: 'Alumni tidak ditemukan' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/alumni/:id/foto - upload photo
router.post('/:id/foto', authenticateToken, upload.single('foto'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'File foto tidak ditemukan' });
    }

    const fotoPath = '/uploads/' + req.file.filename;

    const alumni = await prisma.alumni.update({
      where: { id: req.params.id },
      data: { foto: fotoPath },
    });

    res.json({ success: true, data: { foto: alumni.foto }, message: 'Foto berhasil diupload' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
