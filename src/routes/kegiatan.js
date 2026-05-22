const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const prisma = require('../lib/prisma');

// GET /api/kegiatan - list all events
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    if (status) where.status = status;

    const [total, data] = await Promise.all([
      prisma.kegiatan.count({ where }),
      prisma.kegiatan.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { tanggal: 'desc' },
        include: {
          _count: { select: { registrasi: true } },
        },
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

// POST /api/kegiatan - create event (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const body = req.body;
    if (body.tanggal) body.tanggal = new Date(body.tanggal);
    if (body.kuota) body.kuota = parseInt(body.kuota);
    if (body.anggaran) body.anggaran = parseFloat(body.anggaran);

    const kegiatan = await prisma.kegiatan.create({ data: body });
    res.status(201).json({ success: true, data: kegiatan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/kegiatan/:id - detail
router.get('/:id', async (req, res) => {
  try {
    const kegiatan = await prisma.kegiatan.findUnique({
      where: { id: req.params.id },
      include: {
        _count: { select: { registrasi: true } },
      },
    });

    if (!kegiatan) {
      return res.status(404).json({ success: false, message: 'Kegiatan tidak ditemukan' });
    }

    res.json({ success: true, data: kegiatan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/kegiatan/:id - update (admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const body = { ...req.body };
    delete body.id;
    delete body.createdAt;
    delete body.updatedAt;

    if (body.tanggal) body.tanggal = new Date(body.tanggal);
    if (body.kuota) body.kuota = parseInt(body.kuota);
    if (body.anggaran) body.anggaran = parseFloat(body.anggaran);

    const kegiatan = await prisma.kegiatan.update({
      where: { id: req.params.id },
      data: body,
    });

    res.json({ success: true, data: kegiatan });
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, message: 'Kegiatan tidak ditemukan' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/kegiatan/:id - delete (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.kegiatan.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Kegiatan berhasil dihapus' });
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, message: 'Kegiatan tidak ditemukan' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/kegiatan/:id/daftar - register alumni for event
router.post('/:id/daftar', async (req, res) => {
  try {
    const { alumniId } = req.body;
    if (!alumniId) {
      return res.status(400).json({ success: false, message: 'alumniId wajib diisi' });
    }

    // Check kegiatan exists
    const kegiatan = await prisma.kegiatan.findUnique({ where: { id: req.params.id } });
    if (!kegiatan) {
      return res.status(404).json({ success: false, message: 'Kegiatan tidak ditemukan' });
    }

    // Check quota
    if (kegiatan.kuota) {
      const count = await prisma.registrasiKegiatan.count({ where: { kegiatanId: req.params.id } });
      if (count >= kegiatan.kuota) {
        return res.status(400).json({ success: false, message: 'Kuota kegiatan sudah penuh' });
      }
    }

    const registrasi = await prisma.registrasiKegiatan.create({
      data: {
        alumniId,
        kegiatanId: req.params.id,
      },
    });

    res.status(201).json({ success: true, data: registrasi, message: 'Berhasil mendaftar kegiatan' });
  } catch (err) {
    console.error(err);
    if (err.code === 'P2002') {
      return res.status(400).json({ success: false, message: 'Sudah terdaftar pada kegiatan ini' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/kegiatan/:id/peserta - list registered attendees (admin only)
router.get('/:id/peserta', authenticateToken, async (req, res) => {
  try {
    const peserta = await prisma.registrasiKegiatan.findMany({
      where: { kegiatanId: req.params.id },
      include: {
        alumni: {
          select: {
            id: true, nia: true, namaLengkap: true, noHp: true, email: true,
            kecamatan: true, kampus: true, foto: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    res.json({ success: true, data: peserta, total: peserta.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/kegiatan/:id/peserta/:registrasiId/hadir - mark attendance (admin only)
router.put('/:id/peserta/:registrasiId/hadir', authenticateToken, async (req, res) => {
  try {
    const { hadir } = req.body;
    const updated = await prisma.registrasiKegiatan.update({
      where: { id: req.params.registrasiId },
      data: { hadir: hadir === true || hadir === 'true' },
    });
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
